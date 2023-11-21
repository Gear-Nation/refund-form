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
    .insert([{ email: formState.email.trim().toLowerCase(), isAdmin: formState.isAdmin }]);
  const { error: employeeError } = await supabase
    .from('employees')
    .insert([
      { email: formState.email.trim().toLowerCase(), name: `${formState.firstName.trim() formState.lastName.trim()}` },
    ]);

  if (whitelistError || employeeError) {
    console.log({ error: whitelistError || employeeError });
    return false;
  } else {
    await sendEmail(formState.email.trim().toLowerCase());
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

    const mailConfigs = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'You have been invited to join a Monster Transmission & Performance Internal Tool',
      html: `<p>Please click the link below to sign up for this tool and follow all instructions presented on the screen.</p><br /><br /><a href='https://refund-form.vercel.app/sign-up'>Click Here to Sign Up!</a>`
    };

    transporter.sendMail(mailConfigs, function (err, info) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}
