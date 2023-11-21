import Link from 'next/link';
import LoginForm from '../components/LoginForm';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = createServerComponentClient(
    { cookies },
    { supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API }
  );

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <div>
      <h1 className='text-center text-2xl underline underline-offset-4 mb-4'>Login</h1>
      <LoginForm />
      <p className='text-lg text-center mt-4'>
        Don&apos;t have an account? Sign up{' '}
        <Link
          className='underline underline-offset-4 text-powderBlue hover:text-dukeBlue transition-all duration-200 ease-in-out'
          href={'/sign-up'}
        >
          here
        </Link>
      </p>
    </div>
  );
}
