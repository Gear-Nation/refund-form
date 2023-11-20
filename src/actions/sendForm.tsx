'use server';

import { FormType } from '@/app/components/RefundForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function createForm(formState: FormType) {
  const supabase = createServerComponentClient(
    { cookies },
    { supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API, supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL }
  );

  const { error } = await supabase.from('refundRequests').insert([formState]);
  if (error) {
    return false;
  } else {
    return true;
  }
}
