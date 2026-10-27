import { Poppins } from 'next/font/google';
import './globals.css';
const font = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font' });
export const metadata = { title: 'MediTrack', description: 'Hospital management dashboard: patients, doctors, appointments, prescriptions and billing.' };
export default function RootLayout({ children }) {
  return <html lang="en"><body className={font.variable}>{children}</body></html>;
}
