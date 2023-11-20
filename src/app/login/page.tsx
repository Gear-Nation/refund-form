import Link from 'next/link';
import LoginForm from '../components/LoginForm';

export default async function Page() {
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
