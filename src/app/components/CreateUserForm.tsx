'use client';

import { useState } from 'react';
import { createUser } from '@/actions/createUser';
import Input from './Input';
import { Switch } from '@headlessui/react';

export type CreateUserFormType = {
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
};

export default function CreateUserForm() {
  const [formState, setFormState] = useState<CreateUserFormType>({
    email: '',
    firstName: '',
    lastName: '',
    isAdmin: false
  });

  const [loading, setLoading] = useState(false);

  const [confirmFormState, setConfirmFormState] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });

  async function handleCreateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formState.email.toLowerCase().trim() !== confirmFormState.email.toLowerCase().trim()) {
      alert('Emails do not match');
      return;
    } else if (formState.firstName.trim() !== confirmFormState.firstName.trim()) {
      alert('First names do not match');
      return;
    } else if (formState.lastName.trim() !== confirmFormState.lastName.trim()) {
      alert('Last names do not match');
      return;
    } else if (formState.isAdmin) {
      if (!confirm('Are you sure you want to create an admin user?')) return;
    }

    setLoading(true);
    const success = await createUser(formState);
    if (success) {
      alert('User created successfully');
      setFormState({
        email: '',
        firstName: '',
        lastName: '',
        isAdmin: false
      });
      setConfirmFormState({
        email: '',
        firstName: '',
        lastName: ''
      });
      setLoading(false);
    } else {
      alert('Something went wrong, please try again');
      setLoading(false);
    }
  }

  return (
    <form className='w-full flex flex-col items-center gap-4' onSubmit={(e) => handleCreateUser(e)}>
      <Input
        value={formState.email}
        onchange={(e) => setFormState({ ...formState, email: e.target.value })}
        label='Email'
        name='email'
        type='email'
      />
      <Input
        value={confirmFormState.email}
        onchange={(e) => setConfirmFormState({ ...confirmFormState, email: e.target.value })}
        label='Confirm Email'
        name='confirmEmail'
        type='email'
      />
      <Input
        value={formState.firstName}
        onchange={(e) => setFormState({ ...formState, firstName: e.target.value })}
        label='First Name'
        name='firstName'
      />
      <Input
        value={confirmFormState.firstName}
        onchange={(e) => setConfirmFormState({ ...confirmFormState, firstName: e.target.value })}
        label='Confirm First Name'
        name='confirmFirstName'
      />
      <Input
        value={formState.lastName}
        onchange={(e) => setFormState({ ...formState, lastName: e.target.value })}
        label='Last Name'
        name='lastName'
      />
      <Input
        value={confirmFormState.lastName}
        onchange={(e) => setConfirmFormState({ ...confirmFormState, lastName: e.target.value })}
        label='Confirm Last Name'
        name='confirmLastName'
      />
      <div className='grid grid-cols-2 items-center w-full gap-3'>
        <label className='underline underline-offset-4' htmlFor='isAdmin'>
          Is Admin:
        </label>
        <Switch
          name='isAdmin'
          checked={formState.isAdmin}
          onChange={() => setFormState({ ...formState, isAdmin: !formState.isAdmin })}
          className={`${
            formState.isAdmin ? 'bg-dukeBlue' : 'bg-powderBlue'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ease-in-out`}
        >
          <span className='sr-only'>Is Admin</span>
          <span
            className={`${
              formState.isAdmin ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-ivory transition`}
          />
        </Switch>
      </div>
      <button
        className='bg-trueBlue hover:bg-powderBlue hover:text-jet transition-all duration-200 ease-in-out w-full px-2 py-3 rounded-md'
        type='submit'
      >
        {loading ? 'Creating User...' : 'Create User'}
      </button>
    </form>
  );
}
