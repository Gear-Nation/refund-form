import Image from 'next/image';
import RefundForm from './components/RefundForm';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = createServerComponentClient(
    { cookies },
    { supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API, supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL }
  );

  const { data: session } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return <RefundForm />;
}
