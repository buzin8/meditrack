import { pool } from '@/lib/db';
import { getDemoData } from '@/lib/demo-data';
export const dynamic = 'force-dynamic';

const VIEWS = {
  patients: `SELECT "Patient_ID", "Name", "Age", "Gender", "Contact", "Email", "Address" FROM "Patients" ORDER BY "Patient_ID"`,
  doctors: `SELECT "Doctor_ID", "Name", "Specialization", "Fee", "Experience_Years" FROM "Doctors" ORDER BY "Doctor_ID"`,
  appointments: `SELECT a."Appointment_ID", a."Patient_ID", a."Doctor_ID", p."Name" AS "Patient", d."Name" AS "Doctor", d."Specialization", a."Appointment_Date" AS "Date", a."Status"
    FROM "Appointments" a JOIN "Patients" p USING ("Patient_ID") JOIN "Doctors" d USING ("Doctor_ID") ORDER BY a."Appointment_Date" DESC, a."Appointment_ID" DESC`,
  prescriptions: `SELECT r."Prescription_ID", a."Patient_ID", a."Doctor_ID", p."Name" AS "Patient", d."Name" AS "Doctor", r."Medicine", r."Dosage", r."Duration_Days"
    FROM "Prescriptions" r JOIN "Appointments" a USING ("Appointment_ID") JOIN "Patients" p USING ("Patient_ID") JOIN "Doctors" d USING ("Doctor_ID") ORDER BY r."Prescription_ID"`,
  billing: `SELECT b."Bill_ID", p."Name" AS "Patient", b."Amount", b."Payment_Method", b."Payment_Status"
    FROM "Billing" b JOIN "Appointments" a USING ("Appointment_ID") JOIN "Patients" p USING ("Patient_ID") ORDER BY b."Bill_ID"`,
};

export async function GET(req) {
  const view = new URL(req.url).searchParams.get('view') || 'overview';
  if (!process.env.DATABASE_URL) {
    const data = getDemoData(view);
    return Response.json(data, data.error ? { status: 400 } : undefined);
  }
  try {
    if (view === 'overview') {
      const { rows: [stats] } = await pool.query(`SELECT
        (SELECT COUNT(*) FROM "Patients") AS patients, (SELECT COUNT(*) FROM "Doctors") AS doctors,
        (SELECT COUNT(*) FROM "Appointments") AS appointments,
        (SELECT COALESCE(SUM("Amount"),0) FROM "Billing" WHERE "Payment_Status"='Paid') AS revenue,
        (SELECT COALESCE(SUM("Amount"),0) FROM "Billing" WHERE "Payment_Status"<>'Paid') AS outstanding`);
      const { rows: daily } = await pool.query(`SELECT a."Appointment_Date" AS label, SUM(b."Amount") AS value
        FROM "Billing" b JOIN "Appointments" a USING ("Appointment_ID") GROUP BY a."Appointment_Date" ORDER BY a."Appointment_Date"`);
      const { rows: top } = await pool.query(`SELECT d."Specialization" AS label, SUM(b."Amount") AS value
        FROM "Billing" b JOIN "Appointments" a USING ("Appointment_ID") JOIN "Doctors" d USING ("Doctor_ID")
        GROUP BY d."Specialization" ORDER BY value DESC LIMIT 3`);
      const { rows: specialties } = await pool.query(`SELECT DISTINCT "Specialization" AS label FROM "Doctors" ORDER BY "Specialization"`);
      const { rows: recent } = await pool.query(VIEWS.appointments + ' LIMIT 5');
      return Response.json({ stats, daily, top, specialties, recent });
    }
    if (!VIEWS[view]) return Response.json({ error: 'Unknown view' }, { status: 400 });
    const { rows } = await pool.query(VIEWS[view]);
    return Response.json({ rows });
  } catch (e) {
    return Response.json({ error: 'Database unavailable. Check DATABASE_URL.' }, { status: 500 });
  }
}

export async function POST(req) {
  if (process.env.ALLOW_WRITES !== 'true')
    return Response.json({ error: 'This demo is read-only.' }, { status: 403 });
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }
  const { patientId, doctorId, date } = body || {};
  if (!Number.isInteger(patientId) || !Number.isInteger(doctorId) || !/^\d{4}-\d{2}-\d{2}$/.test(date || ''))
    return Response.json({ error: 'Choose a patient, a doctor and a date.' }, { status: 400 });
  let client;
  let transactionStarted = false;
  try {
    client = await pool.connect();
    await client.query('BEGIN');
    transactionStarted = true;
    const { rows: [appointment] } = await client.query(`INSERT INTO "Appointments" ("Patient_ID", "Doctor_ID", "Appointment_Date", "Status")
      VALUES ($1, $2, $3, 'Scheduled') RETURNING "Appointment_ID"`, [patientId, doctorId, date]);
    await client.query(`INSERT INTO "Billing" ("Appointment_ID", "Amount", "Payment_Method", "Payment_Status")
      SELECT $1, "Fee", 'Pending', 'Pending' FROM "Doctors" WHERE "Doctor_ID" = $2`, [appointment.Appointment_ID, doctorId]);
    await client.query('COMMIT');
    transactionStarted = false;
    return Response.json({ id: appointment.Appointment_ID });
  } catch (e) {
    if (client && transactionStarted) {
      try {
        await client.query('ROLLBACK');
      } catch {
        console.error('Failed to roll back appointment booking transaction.');
      }
    }
    return Response.json({ error: 'Could not book. Check the patient and doctor.' }, { status: 400 });
  } finally {
    client?.release();
  }
}
