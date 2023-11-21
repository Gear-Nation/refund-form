import React from 'react';
import { capitalizeFirstLetters } from '../utils/capitalizeFirstLetter';
import Link from 'next/link';
import { RefundFormType } from '../../../types/refundForm';

export default function Chart({ forms }: { forms: RefundFormType[] }) {
  return (
    <div className='w-full flex items-center flex-col'>
      <div className='w-full grid grid-cols-3 border-2 border-trueBlue rounded-t-md [&>p]:p-3 [&>p]:border-r-2 [&>p]:border-trueBlue last:[&>p]:border-r-0'>
        <p>Created</p>
        <p>Refund Type</p>
        <p>Employee Filled Out Form</p>
      </div>
      {forms.map((form, index: number) => {
        const date = new Date(form.created_at).toLocaleDateString();
        return (
          <Link
            href={`view-forms/${form.id}`}
            key={index}
            className='w-full grid grid-cols-3 border-2 border-t-0 border-trueBlue last:rounded-b-md [&>p]:p-3 [&>p]:border-r-2 [&>p]:border-trueBlue last:[&>p]:border-r-0 hover:bg-powderBlue hover:text-jet transition-all duration-200 ease-in-out'
          >
            <p>{date}</p>
            <p>{capitalizeFirstLetters(form.refundType as string)}</p>
            <p>{form.employeeFillingOutForm}</p>
          </Link>
        );
      })}
    </div>
  );
}
