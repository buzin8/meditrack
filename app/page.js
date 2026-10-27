'use client';
/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from 'react';

const IC = { Home: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z', Patients: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8', Doctors: 'M3 12h4l2-5 4 10 2-5h6', Appointments: 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18', Prescriptions: 'M9 2h6v3H9zM7 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2M8 12h8M8 16h5', Billing: 'M3 6h18v12H3zM3 10h18M7 15h3' };
const TABS = Object.keys(IC);
const EMO = { Cardiology: '🫀', Neurology: '🧠', Orthopedics: '🦴', Ophthalmology: '👁️', Dermatology: '🧴', Pediatrics: '🧸', Gynecology: '🌸', ENT: '👂', Oncology: '🎗️', Urology: '💧', Nephrology: '🩺', Psychiatry: '🧘', Gastroenterology: '🍽️', Endocrinology: '🧬', 'General Medicine': '💊' };
const money = (v) => '₹' + Number(v).toLocaleString('en-IN');
const label = (k) => k.replace(/_/g, ' ');
const day = (d, o) => new Date(d + 'T00:00').toLocaleDateString('en-GB', o);

async function load(view) {
  const r = await fetch('/api/data?view=' + view);
  const j = await r.json();
  if (!r.ok) throw new Error(j.error);
  return j;
}
const Icon = ({ n }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={IC[n]} /></svg>;
const Pill = ({ v }) => <span className={'pill' + (['Paid', 'Completed'].includes(v) ? '' : ' w')}>{v}</span>;

function Chart({ daily }) {
  const W = 640, H = 240, L = 44, R = 14, T = 36, B = 34, n = daily.length;
  const best = daily.reduce((m, p, i) => (p.value > daily[m].value ? i : m), 0);
  const [hover, setHover] = useState(null);
  const hi = hover ?? best;
  const X = (i) => L + (i * (W - L - R)) / Math.max(n - 1, 1);
  const Y = (v) => T + (1 - Math.min(v, 1000) / 1000) * (H - T - B);
  const xy = daily.map((p, i) => [X(i), Y(p.value)]);
  let d = `M${xy[0][0]},${xy[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = xy[i - 1] || xy[i], p1 = xy[i], p2 = xy[i + 1], p3 = xy[i + 2] || p2;
    d += `C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect(), x = ((e.clientX - r.left) / r.width) * W;
    setHover(Math.max(0, Math.min(n - 1, Math.round((x - L) / ((W - L - R) / Math.max(n - 1, 1))))));
  };
  return (
    <svg id="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Daily billing line chart" onPointerMove={move} onPointerDown={move} onPointerLeave={() => setHover(null)}>
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2457d6" stopOpacity=".25" /><stop offset="1" stopColor="#2457d6" stopOpacity="0" /></linearGradient></defs>
      {[0, 250, 500, 750, 1000].map((v) => <text key={v} x={L - 10} y={Y(v) + 4} textAnchor="end">{v}</text>)}
      {daily.map((p, i) => <text key={i} x={X(i)} y={H - 10} textAnchor="middle">{day(p.label, { day: 'numeric', month: 'short' })}</text>)}
      <rect x={xy[hi][0] - 17} y={T - 4} width="34" height={H - T - B + 4} rx="8" fill="#2457d6" opacity=".14" />
      <path d={`${d}L${xy[n - 1][0]},${H - B}L${xy[0][0]},${H - B}Z`} fill="url(#g)" />
      <path d={d} fill="none" stroke="#0d4078" strokeWidth="3" />
      <circle cx={xy[hi][0]} cy={xy[hi][1]} r="5" fill="var(--shell)" stroke="#0d4078" strokeWidth="2.5" />
      <g transform={`translate(${xy[hi][0]},${T - 18})`}><circle r="19" fill="#0d4078" /><text y="4" textAnchor="middle" style={{ fill: '#fff', fontWeight: 600, fontSize: 12 }}>{daily[hi].value}</text></g>
    </svg>
  );
}

function Table({ rows, q, setQ, spec, tab, selectedId, onSelect }) {
  const shown = useMemo(() => {
    const base = spec ? rows.filter((r) => r.Specialization === spec) : rows;
    return base.filter((r) => Object.values(r).join(' ').toLowerCase().includes(q.toLowerCase()));
  }, [rows, q, spec]);
  if (!rows.length) return <p className="msg">No records yet.</p>;
  const cols = Object.keys(rows[0]).filter((c) => !['Patient_ID', 'Doctor_ID'].includes(c));
  const getKey = (row) => {
    if (tab === 'Patients') return row.Patient_ID;
    if (tab === 'Doctors') return row.Doctor_ID;
    if (tab === 'Appointments') return row.Appointment_ID;
    if (tab === 'Prescriptions') return row.Prescription_ID;
    if (tab === 'Billing') return row.Bill_ID;
    return `${row.Name || 'row'}-${JSON.stringify(row)}`;
  };
  return (<>
    <p><input className="f" aria-label="Search" placeholder="Search this table" value={q} onChange={(e) => setQ(e.target.value)} /></p>
    <div className="wrap"><table>
      <thead><tr>{cols.map((c) => <th key={c}>{label(c)}</th>)}</tr></thead>
      <tbody>{shown.map((r) => {
        const key = getKey(r);
        const isSelected = selectedId === key;
        return (<tr className={isSelected ? 'detail-row is-selected' : 'detail-row'} key={key} tabIndex={0} onClick={() => onSelect(r)} onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(r);
          }
        }}>{cols.map((c) => {
          const v = r[c];
          if (c === 'Fee' || c === 'Amount') return <td key={c} className="n">{money(v)}</td>;
          if (c === 'Status' || c === 'Payment_Status') return <td key={c}><Pill v={v} /></td>;
          return <td key={c}>{v}</td>;
        })}</tr>);
      })}</tbody>
    </table></div>
    {!shown.length && <p className="msg">Nothing matches “{q}”.</p>}
  </>);
}

function DetailPanel({ selected, appointments, prescriptions }) {
  if (!selected) return <div className="detail-shell detail-empty">Select a patient or doctor to view a clean profile summary.</div>;

  if (selected.type === 'patient') {
    const history = appointments.filter((a) => a.Patient_ID === selected.row.Patient_ID);
    const meds = prescriptions.filter((p) => p.Patient_ID === selected.row.Patient_ID);
    return (
      <section className="detail-shell">
        <div className="detail-header">
          <div>
            <span className="detail-kicker">Patient detail</span>
            <h3>{selected.row.Name}</h3>
          </div>
        </div>
        <div className="detail-grid">
          <div className="detail-card">
            <strong>Overview</strong>
            <ul>
              <li><span>Age</span><b>{selected.row.Age}</b></li>
              <li><span>Gender</span><b>{selected.row.Gender}</b></li>
              <li><span>Phone</span><b>{selected.row.Contact}</b></li>
              <li><span>Email</span><b>{selected.row.Email}</b></li>
              <li><span>Address</span><b>{selected.row.Address}</b></li>
            </ul>
          </div>
          <div className="detail-card">
            <strong>Visit history</strong>
            <div className="detail-list">
              {history.length ? history.slice(0, 4).map((item) => (
                <div className="detail-item" key={item.Appointment_ID}>
                  <div>
                    <b>{item.Doctor}</b>
                    <small>{item.Specialization}</small>
                  </div>
                  <span>{day(item.Date, { day: 'numeric', month: 'short' })}</span>
                  <Pill v={item.Status} />
                </div>
              )) : <p className="msg">No visit history yet.</p>}
            </div>
          </div>
          <div className="detail-card wide">
            <strong>Prescriptions</strong>
            <div className="detail-list">
              {meds.length ? meds.slice(0, 5).map((item) => (
                <div className="detail-item" key={`${item.Prescription_ID}-${item.Medicine}`}>
                  <div>
                    <b>{item.Medicine}</b>
                    <small>{item.Doctor}</small>
                  </div>
                  <span>{item.Dosage}</span>
                  <span>{item.Duration_Days} days</span>
                </div>
              )) : <p className="msg">No prescriptions found.</p>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (selected.type === 'doctor') {
    const history = appointments.filter((a) => a.Doctor_ID === selected.row.Doctor_ID);
    const doctorPatients = [...new Map(history.map((item) => [item.Patient, { patient: item.Patient, date: item.Date, status: item.Status }])).values()].slice(0, 5);
    return (
      <section className="detail-shell">
        <div className="detail-header">
          <div>
            <span className="detail-kicker">Doctor detail</span>
            <h3>{selected.row.Name}</h3>
          </div>
        </div>
        <div className="detail-grid">
          <div className="detail-card">
            <strong>Profile</strong>
            <ul>
              <li><span>Specialization</span><b>{selected.row.Specialization}</b></li>
              <li><span>Consultation fee</span><b>{money(selected.row.Fee)}</b></li>
              <li><span>Experience</span><b>{selected.row.Experience_Years} years</b></li>
            </ul>
          </div>
          <div className="detail-card">
            <strong>Schedule</strong>
            <div className="detail-list">
              {history.length ? history.slice(0, 4).map((item) => (
                <div className="detail-item" key={`${item.Appointment_ID}-${item.Date}`}>
                  <div>
                    <b>{item.Patient}</b>
                    <small>{item.Status}</small>
                  </div>
                  <span>{day(item.Date, { day: 'numeric', month: 'short' })}</span>
                </div>
              )) : <p className="msg">No schedule data.</p>}
            </div>
          </div>
          <div className="detail-card wide">
            <strong>Patient list</strong>
            <div className="detail-list">
              {doctorPatients.length ? doctorPatients.map((item) => (
                <div className="detail-item" key={`${item.patient}-${item.date}`}>
                  <div>
                    <b>{item.patient}</b>
                    <small>{item.status}</small>
                  </div>
                  <span>{day(item.date, { day: 'numeric', month: 'short' })}</span>
                </div>
              )) : <p className="msg">No patients assigned.</p>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="detail-shell">
      <div className="detail-header">
        <div>
          <span className="detail-kicker">Record detail</span>
          <h3>{selected.row.Name || selected.row.Patient || selected.row.Doctor || 'Record'}</h3>
        </div>
      </div>
      <div className="detail-card">
        <strong>Overview</strong>
        <ul>
          {Object.entries(selected.row).slice(0, 6).map(([key, value]) => (
            <li key={key}><span>{label(key)}</span><b>{typeof value === 'number' ? value : String(value)}</b></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Book({ onDone }) {
  const [opts, setOpts] = useState({ p: [], d: [] });
  const [f, setF] = useState({ patientId: '', doctorId: '', date: '' });
  const [msg, setMsg] = useState(null);
  useEffect(() => { Promise.all([load('patients'), load('doctors')]).then(([p, d]) => setOpts({ p: p.rows, d: d.rows })).catch(() => {}); }, []);
  async function submit(e) {
    e.preventDefault(); setMsg(null);
    const r = await fetch('/api/data', { method: 'POST', body: JSON.stringify({ patientId: +f.patientId, doctorId: +f.doctorId, date: f.date }) });
    const j = await r.json();
    if (r.ok) { setMsg(`Appointment #${j.id} booked.`); onDone(); } else setMsg(j.error);
  }
  return (
    <form className="card form" onSubmit={submit}>
      <select className="f" aria-label="Patient" required value={f.patientId} onChange={(e) => setF({ ...f, patientId: e.target.value })}><option value="">Patient</option>{opts.p.map((p) => <option key={p.Patient_ID} value={p.Patient_ID}>{p.Name}</option>)}</select>
      <select className="f" aria-label="Doctor" required value={f.doctorId} onChange={(e) => setF({ ...f, doctorId: e.target.value })}><option value="">Doctor</option>{opts.d.map((d) => <option key={d.Doctor_ID} value={d.Doctor_ID}>{d.Name}, {d.Specialization}</option>)}</select>
      <input className="f" type="date" aria-label="Date" required value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
      <button className="btn">Book appointment</button>
      {msg && <span className="msg" role="status">{msg}</span>}
    </form>
  );
}

export default function App() {
  const [tab, setTab] = useState('Home');
  const [ov, setOv] = useState(null);
  const [rows, setRows] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [err, setErr] = useState(null);
  const [q, setQ] = useState('');
  const [spec, setSpec] = useState('');
  const [selected, setSelected] = useState(null);

  const reload = () => {
    setRows(null);
    setErr(null);
    if (tab !== 'Home') load(tab.toLowerCase()).then((j) => setRows(j.rows)).catch((e) => setErr(e.message));
  };

  useEffect(() => {
    load('overview').then(setOv).catch((e) => setErr(e.message));
    Promise.all([load('appointments'), load('prescriptions')])
      .then(([a, p]) => {
        setAppointments(a.rows || []);
        setPrescriptions(p.rows || []);
      })
      .catch((e) => setErr(e.message));
  }, []);

  useEffect(() => {
    setSelected(null);
    reload();
  }, [tab]);

  const go = (t, s = '', query = '') => {
    setTab(t);
    setSpec(s);
    setQ(query);
  };

  const handleSelect = (row) => {
    if (tab === 'Patients') setSelected({ type: 'patient', row });
    else if (tab === 'Doctors') setSelected({ type: 'doctor', row });
    else if (row) setSelected({ type: 'record', row });
  };

  const detailId = selected ? (
    tab === 'Patients' ? selected.row.Patient_ID : tab === 'Doctors' ? selected.row.Doctor_ID : selected.row.Appointment_ID || selected.row.Prescription_ID || selected.row.Bill_ID
  ) : null;

  const s = ov?.stats;
  return (
    <div className="shell">
      <nav className="side" aria-label="Sections">
        <div className="logo"><svg width="46" height="34" viewBox="0 0 46 34" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18h9l5-14 8 26 6-16h14" /></svg>MediTrack</div>
        {TABS.map((t) => <button key={t} aria-current={t === tab ? 'page' : undefined} onClick={() => go(t)}><Icon n={t} />{t}</button>)}
      </nav>
      <main className="main">
        {err && <p className="msg" role="alert" style={{ color: '#d6336c' }}>{err}</p>}
        {tab === 'Home' ? (ov ? (<>
          <div className="banner"><img src="/doctor-woman.png" alt="" /><div><p>Hi Admin</p><h2>Track patients, book visits and follow every bill in one place.</h2></div></div>
          <section className="card"><div className="row"><h3>Summary</h3><span className="tag">Billing per day · {money(s.revenue)} collected{ov.demo ? ' · Demo data' : ''}</span></div><Chart daily={ov.daily} /></section>
          <div className="stats">
            <div className="stat c1"><i>🧑‍🤝‍🧑</i><div><b>{s.patients}</b><span>Total Patients</span></div></div>
            <div className="stat c2"><i>🩺</i><div><b>{s.doctors}</b><span>Available Doctors</span></div></div>
            <div className="stat c3"><i>📅</i><div><b>{s.appointments}</b><span>Appointments</span></div></div>
          </div>
          <h3>Schedule</h3>
          {ov.recent.slice(0, 4).map((a) => <div className="sched" key={a.Appointment_ID}><b>{a.Specialization}</b><span>{a.Doctor}</span><span>{day(a.Date, { weekday: 'short', day: 'numeric', month: 'short' })}</span><Pill v={a.Status} /></div>)}
        </>) : !err && <p className="msg">Loading…</p>) : (<>
          <h1 style={{ fontSize: 28 }}>{tab}{spec ? ' · ' + spec : ''}</h1>
          <p className="sub">{rows?.demo ? 'Demo mode · Sample data. No real patients.' : 'Sample hospital data. No real patients.'}</p>
          {tab === 'Appointments' && <Book onDone={reload} />}
          {!rows && !err && <p className="msg">Loading…</p>}
          {rows && (
            <>
              <DetailPanel selected={selected} appointments={appointments} prescriptions={prescriptions} />
              <Table rows={rows} q={q} setQ={setQ} spec={spec} tab={tab} selectedId={detailId} onSelect={handleSelect} />
            </>
          )}
        </>)}
      </main>
      <aside className="right">
        <div className="user"><div className="av">A</div><div><b>Admin</b><br /><small>Front desk</small></div></div>
        <label className="search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
          <input placeholder="Search a doctor" aria-label="Search a doctor" onKeyDown={(e) => { if (e.key === 'Enter') go('Doctors', '', e.target.value); }} /></label>
        <h3>All Specialist</h3>
        <div className="spec">{(ov?.specialties || []).map((t, i) => <button key={t.label} className={['c1', 'c2', 'c3'][i % 3]} onClick={() => go('Doctors', t.label)}><em>{EMO[t.label] || '🩺'}</em><span>{t.label}</span></button>)}</div>
        <div className="promo"><p>Need a visit booked? Add an appointment in seconds.</p><button onClick={() => go('Appointments')}>Book now</button><img src="/doctor-boy.png" alt="" /></div>
      </aside>
    </div>
  );
}
