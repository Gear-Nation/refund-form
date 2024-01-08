import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import { cookies } from 'next/headers';
import type { RefundFormType } from '../../../../types/refundForm';
import { capitalizeFirstLetters } from '@/app/utils/capitalizeFirstLetter';
import ManagerRefundForm from '@/app/components/ManagerRefundForm';
import { redirect } from 'next/navigation';
import MoveToAlfabot from '@/app/components/MoveToAlfabot';

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

  if (formData.completed) {
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
        <div className='w-full flex flex-col gap-5 border-2 border-trueBlue rounded-md p-5'>
          <h1 className='underline underline-offset-4 text-center text-2xl'>Manager Information</h1>
          <TicketInformation label='Refund Type' value={capitalizeFirstLetters(formData.refundType as string)} />
          <TicketInformation label='Payment Method' value={capitalizeFirstLetters(formData.paymentMethod as string)} />
          <TicketInformation label='Refund Amount' value={formData.refundAmount as string} />
          <TicketInformation
            label='Amount Deduction'
            value={capitalizeFirstLetters(formData.amountDeduction as string)}
          />
          <TicketInformation
            label='Manager That Spoke To Customer'
            value={formData.managerThatSpokeToCustomer as string}
          />
          <TicketInformation
            label='Was The Order Saved'
            value={capitalizeFirstLetters(formData.wasTheOrderSaved as string)}
          />
          <TicketInformation
            label='Emailed Customer To Save Order Date'
            value={formData.emailedCustomerToSaveOrderDate ?? 'N/A'}
          />
          <TicketInformation
            label='Order Cancelled With Warehouse Date'
            value={formData.orderCancelledWithWarehouseDate ?? 'N/A'}
          />
          <TicketInformation
            label='Product/Parts Notified Date'
            value={formData.productionPartsNotifiedDate ?? 'N/A'}
          />
          <TicketInformation
            label='Refund Submitted In Alfabot Date'
            value={formData.refundSubmittedInAlfabotDate ?? 'N/A'}
          />
          <TicketInformation
            label='Order Moved To Refund Requested Folder In S4S Date'
            value={formData.orderMovedToRefundRequestedFolderInS4SDate ?? 'N/A'}
          />
          <TicketInformation
            label='Given To Data Analysis For Lost Sale Accountability Date'
            value={formData.givenToDataAnalysisForLostSaleAccountabilityDate ?? 'N/A'}
          />
          <TicketInformation
            label='Called Downloaded And Saved Date'
            value={formData.callsDownloadedAndSavedDate ?? 'N/A'}
          />
          <TicketInformation label={'Manager That Signed Off'} value={formData.generalManagerSignOff ?? 'N/A'} />
          <TicketInformation
            label={formData.approved ? 'Why Approved' : 'Why Denied'}
            value={formData.whyApprovedDenied ?? 'N/A'}
          />
          <TicketInformation
            label={formData.approved ? 'Approved Date' : 'Denied Date'}
            value={formData.approvedDeniedDate ?? 'N/A'}
          />
          <TicketInformation label={'Completed Date'} value={formData.completedDate ?? 'N/A'} />
        </div>
      </div>
    );
  }

  if (formData.approved && !formData.completed) {
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
        <div className='w-full flex flex-col gap-5 border-2 border-trueBlue rounded-md p-5'>
          <h1 className='underline underline-offset-4 text-center text-2xl'>Manager Information</h1>
          <TicketInformation label='Refund Type' value={capitalizeFirstLetters(formData.refundType as string)} />
          <TicketInformation label='Payment Method' value={capitalizeFirstLetters(formData.paymentMethod as string)} />
          <TicketInformation label='Refund Amount' value={formData.refundAmount as string} />
          <TicketInformation
            label='Amount Deduction'
            value={capitalizeFirstLetters(formData.amountDeduction as string)}
          />
          <TicketInformation
            label='Manager That Spoke To Customer'
            value={formData.managerThatSpokeToCustomer as string}
          />
          <TicketInformation
            label='Was The Order Saved'
            value={capitalizeFirstLetters(formData.wasTheOrderSaved as string)}
          />
          <TicketInformation
            label='Emailed Customer To Save Order Date'
            value={formData.emailedCustomerToSaveOrderDate ?? 'N/A'}
          />
          <TicketInformation
            label='Order Cancelled With Warehouse Date'
            value={formData.orderCancelledWithWarehouseDate ?? 'N/A'}
          />
          <TicketInformation
            label='Product/Parts Notified Date'
            value={formData.productionPartsNotifiedDate ?? 'N/A'}
          />
          <TicketInformation
            label='Refund Submitted In Alfabot Date'
            value={formData.refundSubmittedInAlfabotDate ?? 'N/A'}
          />
          <TicketInformation
            label='Order Moved To Refund Requested Folder In S4S Date'
            value={formData.orderMovedToRefundRequestedFolderInS4SDate ?? 'N/A'}
          />
          <TicketInformation
            label='Given To Data Analysis For Lost Sale Accountability Date'
            value={formData.givenToDataAnalysisForLostSaleAccountabilityDate ?? 'N/A'}
          />
          <TicketInformation
            label='Called Downloaded And Saved Date'
            value={formData.callsDownloadedAndSavedDate ?? 'N/A'}
          />
          <TicketInformation label={'Manager That Signed Off'} value={formData.generalManagerSignOff ?? 'N/A'} />
          <TicketInformation
            label={formData.approved ? 'Why Approved' : 'Why Denied'}
            value={formData.whyApprovedDenied ?? 'N/A'}
          />
          <TicketInformation
            label={formData.approved ? 'Approved Date' : 'Denied Date'}
            value={formData.approvedDeniedDate ?? 'N/A'}
          />
          <MoveToAlfabot id={id} />
        </div>
      </div>
    );
  }

  if (formData.denied) {
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
        <div className='w-full flex flex-col gap-5 border-2 border-trueBlue rounded-md p-5'>
          <h1 className='underline underline-offset-4 text-center text-2xl'>Manager Information</h1>
          <TicketInformation label='Refund Type' value={capitalizeFirstLetters(formData.refundType as string)} />
          <TicketInformation label='Payment Method' value={capitalizeFirstLetters(formData.paymentMethod as string)} />
          <TicketInformation label='Refund Amount' value={formData.refundAmount as string} />
          <TicketInformation
            label='Amount Deduction'
            value={capitalizeFirstLetters(formData.amountDeduction as string)}
          />
          <TicketInformation
            label='Manager That Spoke To Customer'
            value={formData.managerThatSpokeToCustomer as string}
          />
          <TicketInformation
            label='Was The Order Saved'
            value={capitalizeFirstLetters(formData.wasTheOrderSaved as string)}
          />
          <TicketInformation
            label='Emailed Customer To Save Order Date'
            value={formData.emailedCustomerToSaveOrderDate ?? 'N/A'}
          />
          <TicketInformation
            label='Order Cancelled With Warehouse Date'
            value={formData.orderCancelledWithWarehouseDate ?? 'N/A'}
          />
          <TicketInformation
            label='Product/Parts Notified Date'
            value={formData.productionPartsNotifiedDate ?? 'N/A'}
          />
          <TicketInformation
            label='Refund Submitted In Alfabot Date'
            value={formData.refundSubmittedInAlfabotDate ?? 'N/A'}
          />
          <TicketInformation
            label='Order Moved To Refund Requested Folder In S4S Date'
            value={formData.orderMovedToRefundRequestedFolderInS4SDate ?? 'N/A'}
          />
          <TicketInformation
            label='Given To Data Analysis For Lost Sale Accountability Date'
            value={formData.givenToDataAnalysisForLostSaleAccountabilityDate ?? 'N/A'}
          />
          <TicketInformation
            label='Called Downloaded And Saved Date'
            value={formData.callsDownloadedAndSavedDate ?? 'N/A'}
          />
          <TicketInformation label={'Manager That Signed Off'} value={formData.generalManagerSignOff ?? 'N/A'} />
          <TicketInformation
            label={formData.approved ? 'Why Approved' : 'Why Denied'}
            value={formData.whyApprovedDenied ?? 'N/A'}
          />
          <TicketInformation
            label={formData.approved ? 'Approved Date' : 'Denied Date'}
            value={formData.approvedDeniedDate ?? 'N/A'}
          />
        </div>
      </div>
    );
  }

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
