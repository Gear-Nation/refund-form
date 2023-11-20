import Link from 'next/link';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

export default async function Page() {
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
