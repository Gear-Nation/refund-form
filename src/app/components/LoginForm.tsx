'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import Input from './Input';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const supabase = createClientComponentClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: formState.email.trim().toLowerCase(),
      password: formState.password.trim()
    });
    if (error) {
      alert('Something went wrong, please try again');
      console.log(error);
      setLoading(false);
    }
    router.refresh();
    setLoading(false);
  }
  return (
    <form className='w-full flex flex-col gap-4' onSubmit={(e) => handleSignIn(e)}>
      <Input
        label='Email'
        name='email'
        onchange={(e) => setFormState({ ...formState, email: e.target.value })}
        value={formState.email}
      />
      <Input
        label='Password'
        name='password'
        onchange={(e) => setFormState({ ...formState, password: e.target.value })}
        value={formState.password}
        type='password'
      />
      <button
        className='bg-trueBlue hover:bg-powderBlue hover:text-jet transition-all duration-200 ease-in-out w-full px-2 py-3 rounded-md'
        type='submit'
      >
        {loading ? 'Logging In...' : 'Login'}
      </button>
    </form>
  );
}
