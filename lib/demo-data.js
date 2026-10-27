const patients = [
  { Patient_ID: 1, Name: 'Rohit Sharma', Age: 34, Gender: 'M', Contact: '9831000001', Email: 'rohit.sharma@gmail.com', Address: 'Kolkata' },
  { Patient_ID: 2, Name: 'Simran Kaur', Age: 29, Gender: 'F', Contact: '9831000002', Email: 'simran.kaur@yahoo.com', Address: 'Delhi' },
  { Patient_ID: 3, Name: 'Amit Ghosh', Age: 45, Gender: 'M', Contact: '9831000003', Email: 'amit.ghosh@gmail.com', Address: 'Mumbai' },
  { Patient_ID: 4, Name: 'Nisha Patel', Age: 51, Gender: 'F', Contact: '9831000004', Email: 'nisha.patel@hotmail.com', Address: 'Ahmedabad' },
  { Patient_ID: 5, Name: 'Suresh Reddy', Age: 60, Gender: 'M', Contact: '9831000005', Email: 'suresh.reddy@gmail.com', Address: 'Hyderabad' },
  { Patient_ID: 6, Name: 'Meera Nair', Age: 38, Gender: 'F', Contact: '9831000006', Email: 'meera.nair@yahoo.com', Address: 'Chennai' },
  { Patient_ID: 7, Name: 'Vikas Yadav', Age: 27, Gender: 'M', Contact: '9831000007', Email: 'vikas.yadav@outlook.com', Address: 'Lucknow' },
  { Patient_ID: 8, Name: 'Anjali Gupta', Age: 33, Gender: 'F', Contact: '9831000008', Email: 'anjali.gupta@gmail.com', Address: 'Jaipur' },
  { Patient_ID: 9, Name: 'Rajesh Kumar', Age: 55, Gender: 'M', Contact: '9831000009', Email: 'rajesh.kumar@yahoo.com', Address: 'Pune' },
  { Patient_ID: 10, Name: 'Pooja Singh', Age: 41, Gender: 'F', Contact: '9831000010', Email: 'pooja.singh@gmail.com', Address: 'Bhopal' },
  { Patient_ID: 11, Name: 'Sanjay Verma', Age: 48, Gender: 'M', Contact: '9831000011', Email: 'sanjay.verma@outlook.com', Address: 'Kolkata' },
  { Patient_ID: 12, Name: 'Kiran Das', Age: 36, Gender: 'F', Contact: '9831000012', Email: 'kiran.das@gmail.com', Address: 'Delhi' },
  { Patient_ID: 13, Name: 'Manoj Tiwari', Age: 29, Gender: 'M', Contact: '9831000013', Email: 'manoj.tiwari@yahoo.com', Address: 'Mumbai' },
  { Patient_ID: 14, Name: 'Ritu Chatterjee', Age: 44, Gender: 'F', Contact: '9831000014', Email: 'ritu.chatterjee@gmail.com', Address: 'Kolkata' },
  { Patient_ID: 15, Name: 'Deepak Joshi', Age: 52, Gender: 'M', Contact: '9831000015', Email: 'deepak.joshi@outlook.com', Address: 'Ahmedabad' },
  { Patient_ID: 16, Name: 'Swati Bose', Age: 31, Gender: 'F', Contact: '9831000016', Email: 'swati.bose@gmail.com', Address: 'Hyderabad' },
  { Patient_ID: 17, Name: 'Arvind Rao', Age: 39, Gender: 'M', Contact: '9831000017', Email: 'arvind.rao@yahoo.com', Address: 'Chennai' },
  { Patient_ID: 18, Name: 'Nandini Sen', Age: 26, Gender: 'F', Contact: '9831000018', Email: 'nandini.sen@gmail.com', Address: 'Lucknow' },
  { Patient_ID: 19, Name: 'Harish Chandra', Age: 58, Gender: 'M', Contact: '9831000019', Email: 'harish.chandra@outlook.com', Address: 'Jaipur' },
  { Patient_ID: 20, Name: 'Lata Mishra', Age: 47, Gender: 'F', Contact: '9831000020', Email: 'lata.mishra@gmail.com', Address: 'Pune' },
];

const doctors = [
  { Doctor_ID: 201, Name: 'Dr. Rohan Mehta', Specialization: 'Cardiology', Fee: 800, Experience_Years: 12 },
  { Doctor_ID: 202, Name: 'Dr. Ananya Roy', Specialization: 'Dermatology', Fee: 500, Experience_Years: 8 },
  { Doctor_ID: 203, Name: 'Dr. Vikram Singh', Specialization: 'Orthopedics', Fee: 700, Experience_Years: 15 },
  { Doctor_ID: 204, Name: 'Dr. Priya Nair', Specialization: 'Pediatrics', Fee: 450, Experience_Years: 10 },
  { Doctor_ID: 205, Name: 'Dr. Arjun Kapoor', Specialization: 'Neurology', Fee: 900, Experience_Years: 18 },
  { Doctor_ID: 206, Name: 'Dr. Sneha Iyer', Specialization: 'Gynecology', Fee: 600, Experience_Years: 9 },
  { Doctor_ID: 207, Name: 'Dr. Karan Malhotra', Specialization: 'ENT', Fee: 400, Experience_Years: 7 },
  { Doctor_ID: 208, Name: 'Dr. Divya Menon', Specialization: 'Ophthalmology', Fee: 550, Experience_Years: 11 },
  { Doctor_ID: 209, Name: 'Dr. Rahul Verma', Specialization: 'General Medicine', Fee: 300, Experience_Years: 6 },
  { Doctor_ID: 210, Name: 'Dr. Neha Joshi', Specialization: 'Psychiatry', Fee: 650, Experience_Years: 13 },
  { Doctor_ID: 211, Name: 'Dr. Sameer Khan', Specialization: 'Urology', Fee: 750, Experience_Years: 14 },
  { Doctor_ID: 212, Name: 'Dr. Pooja Desai', Specialization: 'Endocrinology', Fee: 700, Experience_Years: 10 },
  { Doctor_ID: 213, Name: 'Dr. Aditya Rao', Specialization: 'Gastroenterology', Fee: 800, Experience_Years: 16 },
  { Doctor_ID: 214, Name: 'Dr. Kavita Pillai', Specialization: 'Oncology', Fee: 1000, Experience_Years: 20 },
  { Doctor_ID: 215, Name: 'Dr. Manish Agarwal', Specialization: 'Nephrology', Fee: 850, Experience_Years: 17 },
];

const visits = [
  { Appointment_ID: 3001, Patient_ID: 1, Doctor_ID: 201, Date: '2024-01-05', Status: 'Completed' },
  { Appointment_ID: 3002, Patient_ID: 3, Doctor_ID: 205, Date: '2024-01-06', Status: 'Completed' },
  { Appointment_ID: 3003, Patient_ID: 5, Doctor_ID: 203, Date: '2024-01-07', Status: 'Completed' },
  { Appointment_ID: 3004, Patient_ID: 7, Doctor_ID: 209, Date: '2024-01-08', Status: 'Completed' },
  { Appointment_ID: 3005, Patient_ID: 10, Doctor_ID: 214, Date: '2024-01-09', Status: 'Completed' },
  { Appointment_ID: 3006, Patient_ID: 2, Doctor_ID: 206, Date: '2024-01-10', Status: 'Completed' },
  { Appointment_ID: 3007, Patient_ID: 4, Doctor_ID: 202, Date: '2024-01-11', Status: 'Completed' },
  { Appointment_ID: 3008, Patient_ID: 6, Doctor_ID: 208, Date: '2024-01-12', Status: 'Completed' },
  { Appointment_ID: 3009, Patient_ID: 8, Doctor_ID: 213, Date: '2024-01-13', Status: 'Completed' },
  { Appointment_ID: 3010, Patient_ID: 9, Doctor_ID: 210, Date: '2024-01-14', Status: 'Completed' },
];

const medicationRows = [
  [5001, 3001, 'Aspirin', '75mg', 30],
  [5002, 3001, 'Atorvastatin', '20mg', 30],
  [5003, 3002, 'Levetiracetam', '500mg', 60],
  [5004, 3002, 'Gabapentin', '300mg', 30],
  [5005, 3003, 'Ibuprofen', '400mg', 10],
  [5006, 3003, 'Calcium', '500mg', 30],
  [5007, 3004, 'Paracetamol', '500mg', 5],
  [5008, 3005, 'Tamoxifen', '20mg', 90],
  [5009, 3006, 'Folic Acid', '5mg', 30],
  [5010, 3007, 'Cetirizine', '10mg', 15],
  [5011, 3008, 'Timolol Eye Drops', '0.5%', 30],
  [5012, 3009, 'Omeprazole', '20mg', 14],
  [5013, 3010, 'Sertraline', '50mg', 60],
];

const bills = [
  [4001, 3001, 800, 'Credit Card', 'Paid'],
  [4002, 3002, 900, 'Credit Card', 'Paid'],
  [4003, 3003, 700, 'Cash', 'Paid'],
  [4004, 3004, 300, 'Debit Card', 'Paid'],
  [4005, 3005, 1000, 'Credit Card', 'Paid'],
  [4006, 3006, 600, 'UPI', 'Paid'],
  [4007, 3007, 500, 'Cash', 'Paid'],
  [4008, 3008, 550, 'Debit Card', 'Paid'],
  [4009, 3009, 800, 'Credit Card', 'Paid'],
  [4010, 3010, 650, 'UPI', 'Paid'],
];

const appointmentRows = visits.map((visit) => {
  const patient = patients.find((row) => row.Patient_ID === visit.Patient_ID);
  const doctor = doctors.find((row) => row.Doctor_ID === visit.Doctor_ID);
  return {
    ...visit,
    Patient: patient.Name,
    Doctor: doctor.Name,
    Specialization: doctor.Specialization,
  };
});

const prescriptionRows = medicationRows.map(([Prescription_ID, Appointment_ID, Medicine, Dosage, Duration_Days]) => {
  const appointment = appointmentRows.find((row) => row.Appointment_ID === Appointment_ID);
  return {
    Prescription_ID,
    Patient_ID: appointment.Patient_ID,
    Doctor_ID: appointment.Doctor_ID,
    Patient: appointment.Patient,
    Doctor: appointment.Doctor,
    Medicine,
    Dosage,
    Duration_Days,
  };
});

const billingRows = bills.map(([Bill_ID, Appointment_ID, Amount, Payment_Method, Payment_Status]) => {
  const appointment = appointmentRows.find((row) => row.Appointment_ID === Appointment_ID);
  return { Bill_ID, Patient: appointment.Patient, Amount, Payment_Method, Payment_Status };
});

export function getDemoData(view) {
  if (view === 'patients') return { rows: patients, demo: true };
  if (view === 'doctors') return { rows: doctors, demo: true };
  if (view === 'appointments') {
    const rows = [...appointmentRows].sort((a, b) => b.Date.localeCompare(a.Date) || b.Appointment_ID - a.Appointment_ID);
    return { rows, demo: true };
  }
  if (view === 'prescriptions') return { rows: prescriptionRows, demo: true };
  if (view === 'billing') return { rows: billingRows, demo: true };
  if (view !== 'overview') return { error: 'Unknown view' };

  const daily = bills.map(([, Appointment_ID, value]) => {
    const appointment = appointmentRows.find((row) => row.Appointment_ID === Appointment_ID);
    return { label: appointment.Date, value };
  });
  const top = [...doctors]
    .map((doctor) => ({
      label: doctor.Specialization,
      value: bills.reduce((total, [, Appointment_ID, amount]) => {
        const appointment = appointmentRows.find((row) => row.Appointment_ID === Appointment_ID);
        return total + (appointment.Doctor_ID === doctor.Doctor_ID ? amount : 0);
      }, 0),
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  return {
    stats: {
      patients: patients.length,
      doctors: doctors.length,
      appointments: appointmentRows.length,
      revenue: bills.reduce((total, [, , amount, , status]) => total + (status === 'Paid' ? amount : 0), 0),
      outstanding: bills.reduce((total, [, , amount, , status]) => total + (status !== 'Paid' ? amount : 0), 0),
    },
    daily,
    top,
    specialties: [...new Set(doctors.map((doctor) => doctor.Specialization))]
      .sort((a, b) => a.localeCompare(b))
      .map((label) => ({ label })),
    recent: [...appointmentRows]
      .sort((a, b) => b.Date.localeCompare(a.Date) || b.Appointment_ID - a.Appointment_ID)
      .slice(0, 5),
    demo: true,
  };
}
