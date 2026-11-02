import { pool } from '@/lib/db';

export async function POST(req) {
  if (!process.env.DATABASE_URL)
    return Response.json({ error: 'Patient records cannot be saved in demo mode. Configure DATABASE_URL first.' }, { status: 503 });
  if (process.env.ALLOW_WRITES !== 'true')
    return Response.json({ error: 'Patient changes are disabled. Set ALLOW_WRITES=true to enable writes.' }, { status: 403 });

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body))
    return Response.json({ error: 'Provide patient details.' }, { status: 400 });

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const age = body.age;
  const gender = body.gender;
  const contact = typeof body.contact === 'string' ? body.contact.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const address = typeof body.address === 'string' ? body.address.trim() : '';

  if (!name || name.length > 100)
    return Response.json({ error: 'Enter a name of up to 100 characters.' }, { status: 400 });
  if (!Number.isInteger(age) || age < 0 || age > 130)
    return Response.json({ error: 'Enter an age from 0 to 130.' }, { status: 400 });
  if (!['M', 'F', 'Other'].includes(gender))
    return Response.json({ error: 'Choose a valid gender.' }, { status: 400 });
  if ((typeof body.contact !== 'string' && body.contact != null) || contact.length > 15)
    return Response.json({ error: 'Phone number must be 15 characters or fewer.' }, { status: 400 });
  if ((typeof body.email !== 'string' && body.email != null) || email.length > 100 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))
    return Response.json({ error: 'Enter a valid email address of up to 100 characters.' }, { status: 400 });
  if ((typeof body.address !== 'string' && body.address != null) || address.length > 100)
    return Response.json({ error: 'Address must be 100 characters or fewer.' }, { status: 400 });

  try {
    const { rows: [patient] } = await pool.query(
      `INSERT INTO "Patients" ("Name", "Age", "Gender", "Contact", "Email", "Address")
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING "Patient_ID", "Name", "Age", "Gender", "Contact", "Email", "Address"`,
      [name, age, gender, contact || null, email || null, address || null],
    );
    return Response.json({ patient }, { status: 201 });
  } catch (error) {
    console.error('Failed to create patient.', error);
    return Response.json({ error: 'Could not save the patient. Check the database connection and schema.' }, { status: 500 });
  }
}
