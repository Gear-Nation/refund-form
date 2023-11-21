import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import { cookies } from 'next/headers';
import type { RefundFormType } from '../../../../types/refundForm';
import { capitalizeFirstLetters } from '@/app/utils/capitalizeFirstLetter';
import ManagerRefundForm from '@/app/components/ManagerRefundForm';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const supabase = createServerComponentClient(
    { cookies },
    { supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API, supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();
  const userEmail = user?.email;

  const { data: isAdmin } = await supabase.from('whitelist').select('isAdmin').match({ email: userEmail }).single();
  const { data: userName } = await supabase.from('employees').select('name').match({ email: userEmail }).single();

  if (!isAdmin) redirect('/');

  const { data } = await supabase.from('refundRequests').select('*').match({ id }).single();

  const formData = data as RefundFormType;

  const reasonForRefund = JSON.parse(formData.reasonForRefund ?? '[]');

  return (
    <div className='w-full flex flex-col gap-5'>
      <div className='w-full flex flex-col gap-5 border-2 border-trueBlue rounded-md p-5'>
        <h1 className='underline underline-offset-4 text-center text-2xl'>Employee Information</h1>
        <TicketInformation label='Date Created' value={new Date(formData.created_at).toLocaleDateString()} />
        <TicketInformation label='Date of Order' value={formData.dateOfOrder as string} />
        <TicketInformation label='Order Number' value={formData.orderNumber as string} />
        <TicketInformation
          label='Product Specialist Sold Order'
          value={formData.productSpecialistSoldOrder as string}
        />
        <TicketInformation label='Customer Name' value={formData.customerName as string} />
        <TicketInformation label='Employee Filled Out Form' value={formData.employeeFillingOutForm as string} />
        <TicketInformation label='Reason(s) for Refund' value={reasonForRefund.join(', ') ?? 'N/A'} />
        <TicketInformation label='Type of Return' value={capitalizeFirstLetters(formData.typeOfReturn as string)} />
      </div>
      <ManagerRefundForm managerName={userName?.name} id={id} formData={formData} />
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
      <p className='underline underline-offset-4 '>{label}:</p>
      <p>{value}</p>
    </div>
  );
}
