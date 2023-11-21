import Link from 'next/link';
import SignUpForm from '../components/SignUpForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
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
      <h1 className='text-center text-2xl underline underline-offset-4 mb-4'>Sign Up</h1>
      <SignUpForm />
      <p className='text-lg text-center mt-4'>
        Already have an account? Login{' '}
        <Link
          className='underline underline-offset-4 text-powderBlue hover:text-dukeBlue transition-all duration-200 ease-in-out'
          href={'/login'}
        >
          here
        </Link>
      </p>
    </div>
  );
}
