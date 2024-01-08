'use server';

import { ManagerFormType } from '@/app/components/ManagerRefundForm';
import { supabase } from '@/app/utils/supabase';
import nodemailer from 'nodemailer';

export async function sendManagerForm(formState: ManagerFormType, name: string, id: string) {
  if (formState.approved || formState.denied) {
    formState.generalManagerSignOff = name;
  }

  const { error } = await supabase.from('refundRequests').update([formState]).match({ id });
  if (error) {
    return false;
  } else {
    return true;
  }
}

export async function sendDeniedEmail(name: string, notes: string, orderNumber: string) {
  const { data } = await supabase.from('employees').select('email').match({ name }).single();
  const email = data?.email;

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
      subject: `Refund request for order number ${orderNumber} has been denied`,
      html: `<p>Your refund request has been denied for the following reasons: ${notes}</p>`
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

export async function approveForm(id: string | number) {
  const now = new Date();
  const date = now.toLocaleDateString();
  id = Number(id);
  const { error } = await supabase
    .from('refundRequests')
    .update({ completed: true, completedDate: date })
    .match({ id });

  if (error) {
    return false;
  } else {
    return true;
  }
}
