import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect root to the auth login page
  redirect('/login');
}
