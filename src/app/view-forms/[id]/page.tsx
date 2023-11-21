import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import { cookies } from 'next/headers';
import type { RefundFormType } from '../../../../types/refundForm';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const supabase = createServerComponentClient(
    { cookies },
    { supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API, supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL }
  );

  const { data: formData } = await supabase.from('refundRequests').select('*').match({ id }).single();

  formData as RefundFormType;

  return (
    <div className='w-full flex flex-col'>
      <TicketInformation label='Date Created' value={new Date(formData.created_at).toLocaleDateString()} />
    </div>
  );
}

interface TicketInformationProps {
  label: string;
  value: string;
}

function TicketInformation({ label, value }: TicketInformationProps) {
  return (
    <div className='grid grid-cols-2 items-center w-full'>
      <p className='underline underline-offset-4 font-semibold'>{label}:</p>
      <p>{value}</p>
    </div>
  );
}
