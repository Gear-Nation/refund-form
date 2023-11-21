'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { CreateUserFormType } from '@/app/components/CreateUserForm';
import nodemailer from 'nodemailer';

export async function createUser(formState: CreateUserFormType) {
  const supabase = createServerActionClient(
    { cookies },
    { supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API }
  );

  const { error: whitelistError } = await supabase
    .from('whitelist')
    .insert([{ email: formState.email.trim().toLowerCase() }, { isAdmin: formState.isAdmin }]);
  const { error: employeeError } = await supabase
    .from('employees')
    .insert([
      { email: formState.email.trim().toLowerCase() },
      { name: `${(formState.firstName.trim(), formState.lastName.trim())}` }
    ]);

  if (whitelistError || employeeError) {
    console.log({ error: whitelistError || employeeError });
    return false;
  } else {
    return true;
  }
}

function sendEmail(email: string) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_EMAIL_PW
      }
    });
  });
}
