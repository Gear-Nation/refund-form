'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from './Input';

export default function SignUpForm() {
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
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: formState.email.trim().toLowerCase(),
      password: formState.password.trim(),
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`
      }
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
    <form className='w-full flex flex-col gap-4' onSubmit={(e) => handleSignUp(e)}>
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
      <Input
        label='Confirm Password'
        name='confirmPassword'
        onchange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        type='password'
      />
      <button
        className='bg-trueBlue hover:bg-powderBlue hover:text-jet transition-all duration-200 ease-in-out w-full px-2 py-3 rounded-md'
        type='submit'
      >
        {loading ? 'Validating...' : 'Sign Up'}
      </button>
    </form>
  );
}
