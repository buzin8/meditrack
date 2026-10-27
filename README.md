# MediTrack

Hospital management dashboard (blue dashboard UI with specialist cards, billing chart and schedule): Next.js (React) UI and API routes on Vercel, Neon PostgreSQL database.
Tables: Patients, Doctors, Appointments, Prescriptions, Billing (sample data is fictional).

## Run locally
1. In PowerShell, go to the folder that contains `package.json`: `cd C:\Users\buzin\Downloads\meditrack\meditrack`
2. Run `npm install`
3. Run `npm run dev` and open the local URL printed in the terminal (usually http://localhost:3000; if that port is busy, Next.js may use http://localhost:3001). With no `DATABASE_URL`, the app uses the read-only fictional sample-data demo.
4. To connect Neon, install the Neon CLI with `npm install -g neon@latest`, sign in using `neon login`, and link the project and branch with `neon link`. `neon deploy` applies the `neon.ts` policy and pulls the pooled app connection string into `.env.local`.
5. Run `npm run db:seed` to create the tables and load fictional sample records, then restart `npm run dev`. The seed script uses `DATABASE_URL_UNPOOLED` for direct database access when available. Seeding drops and recreates the five tables.

Keep `.env.local` private; do not commit or share the database URL. If `DATABASE_URL` is unset, the app uses the read-only demo data.

## Deploy on Vercel
1. Create a Neon project and run `npm run db:seed` with its pooled connection string in `DATABASE_URL`. In Vercel, add the same value under Project Settings > Environment Variables. Without `DATABASE_URL`, the app uses fictional read-only demo data.
2. In Vercel, set the project's **Root Directory** to `meditrack` (the folder containing `package.json` and `app/`). The Git repository is one directory above the Next.js app.
3. Use `npm run build` as the Build Command and leave the Output Directory setting at its default.
4. Add `DATABASE_URL` in Project Settings > Environment Variables, then redeploy.
5. Keep `ALLOW_WRITES=false` on the public site (read-only). Set it to `true` only to demo booking.
