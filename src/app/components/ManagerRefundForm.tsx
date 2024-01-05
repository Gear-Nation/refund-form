'use client';

import React, { useState } from 'react';
import Input from './Input';
import SelectInput from './SelectInput';
import { sendManagerForm, sendDeniedEmail } from '@/actions/sendManagerForm';
import { RefundFormType } from '../../../types/refundForm';
import TextArea from './TextArea';
import { useRouter } from 'next/navigation';

export type ManagerFormType = {
  refundType: string;
  paymentMethod: string;
  refundAmount: string;
  amountDeduction: string;
  managerThatSpokeToCustomer: string;
  wasTheOrderSaved: string;
  emailedCustomerToSaveOrderDate: string;
  orderCancelledWithWarehouseDate: string;
  productionPartsNotifiedDate: string;
  refundSubmittedInAlfabotDate: string;
  orderMovedToRefundRequestedFolderInS4SDate: string;
  givenToDataAnalysisForLostSaleAccountabilityDate: string;
  callsDownloadedAndSavedDate: string;
  generalManagerSignOff: string;
  approved: boolean;
  denied: boolean;
  whyApprovedDenied: string;
  approvedDeniedDate: string;
};

interface Props {
  formData: RefundFormType;
  managerName: string;
  id: string;
}

export default function ManagerRefundForm({ formData, managerName, id }: Props) {
  const [loading, setLoading] = useState(false);
  const [notesModalOpen, setNotesModelOpen] = useState(false);
  const [formState, setFormState] = useState({
    refundType: formData.refundType ?? '',
    paymentMethod: formData.paymentMethod ?? '',
    refundAmount: formData.refundAmount ?? '',
    amountDeduction: formData.amountDeduction ?? '',
    managerThatSpokeToCustomer: formData.managerThatSpokeToCustomer ?? '',
    wasTheOrderSaved: formData.wasTheOrderSaved ?? '',
    emailedCustomerToSaveOrderDate: formData.emailedCustomerToSaveOrderDate ?? '',
    orderCancelledWithWarehouseDate: formData.orderCancelledWithWarehouseDate ?? '',
    productionPartsNotifiedDate: formData.productionPartsNotifiedDate ?? '',
    refundSubmittedInAlfabotDate: formData.refundSubmittedInAlfabotDate ?? '',
    orderMovedToRefundRequestedFolderInS4SDate: formData.orderMovedToRefundRequestedFolderInS4SDate ?? '',
    givenToDataAnalysisForLostSaleAccountabilityDate: formData.givenToDataAnalysisForLostSaleAccountabilityDate ?? '',
    callsDownloadedAndSavedDate: formData.callsDownloadedAndSavedDate ?? '',
    denied: formData.denied ?? false,
    approved: formData.approved ?? false,
    generalManagerSignOff: '',
    whyApprovedDenied: '',
    approvedDeniedDate: ''
  });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!confirm('Are you sure you want to update this form?')) return;
    e.preventDefault();
    setLoading(true);
    if (formState.denied) {
      sendDeniedEmail(formData.employeeFillingOutForm ?? '', formState.whyApprovedDenied, formData.orderNumber ?? '');
    }
    const success = await sendManagerForm(formState, managerName, id);
    if (success) {
      alert('Form updated successfully');
      router.refresh();
      setLoading(false);
    } else {
      alert('There was an error submitting the form');
      return setLoading(false);
    }
  }

  async function handleApprove() {
    const date = new Date();
    setFormState({
      ...formState,
      approved: !formState.approved,
      denied: false,
      approvedDeniedDate: date.toLocaleDateString()
    });
    setNotesModelOpen(true);
  }

  async function handleDenied() {
    const date = new Date();
    setFormState({
      ...formState,
      denied: !formState.denied,
      approved: false,
      approvedDeniedDate: date.toLocaleDateString()
    });
    setNotesModelOpen(true);
  }

  return (
    <form
      className='w-full flex flex-col items-center gap-5 border-2 border-trueBlue rounded-md p-5 relative'
      onSubmit={(e) => handleSubmit(e)}
    >
      {notesModalOpen && (
        <div className='absolute w-full bg-jet/70 backdrop-blur h-full top-0 rounded-md p-5 flex flex-col gap-5'>
          <TextArea
            label={formState.approved ? 'Reason for approval' : 'Reason for denial'}
            name='approvedDeniedNotes'
            value={formState.whyApprovedDenied}
            onchange={(e) => setFormState({ ...formState, whyApprovedDenied: e.target.value })}
          />
          <button
            className='bg-trueBlue hover:bg-powderBlue hover:text-jet transition-all duration-200 ease-in-out w-full px-2 py-3 rounded-md'
            type='submit'
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      )}
      <SelectInput
        label='Refund Type'
        name='refundType'
        value={formState.refundType}
        onchange={(e) => setFormState({ ...formState, refundType: e.target.value })}
      >
        <option value=''>Select Refund Type</option>
        <option value='partial refund'>Partial Refund</option>
        <option value={'cancellation'}>Cancellation</option>
        <option value={'authorized return'}>Authorized Return</option>
        <option value='chargeback'>Chargeback</option>
        <option value='goodwill'>Goodwill Refund</option>
        <option value='core refund'>Core Refund</option>
        <option value='warranty reimbursement'>Warranty Reimbursement</option>
      </SelectInput>
      <SelectInput
        label='Payment Method'
        name='paymentMethod'
        value={formState.paymentMethod}
        onchange={(e) => setFormState({ ...formState, paymentMethod: e.target.value })}
      >
        <option value=''>Select Payment Method</option>
        <option value='credit card secure'>Credit Card Secure</option>
        <option value={'intuit'}>Intuit</option>
        <option value={'stripe'}>Stripe</option>
        <option value='check'>Check</option>
        <option value='affirm'>Affirm</option>
        <option value='payTomorrow'>PayTomorrow</option>
        <option value='Shift4Payments'>Shift4Payments</option>
        <option value={'square'}>Square</option>
      </SelectInput>
      <Input
        label='Refund Amount'
        name='refundAmount'
        onchange={(e) => setFormState({ ...formState, refundAmount: e.target.value })}
        value={formState.refundAmount}
      />
      <SelectInput
        label='Refund Deduction'
        name='refundDeduction'
        value={formState.amountDeduction}
        onchange={(e) => setFormState({ ...formState, amountDeduction: e.target.value })}
      >
        <option value='order in full'>Order in Full</option>
        <option value='minus 25% fee'>Minus 25% Fee</option>
        <option value={'minus processing fee'}>Minus Processing Fee</option>
        <option value={'custom amount'}>Custom Amount</option>
      </SelectInput>
      <Input
        label='Manager That Spoke to Customer'
        name='managerThatSpokeToCustomer'
        onchange={(e) => setFormState({ ...formState, managerThatSpokeToCustomer: e.target.value })}
        value={formState.managerThatSpokeToCustomer}
      />
      <SelectInput
        value={formState.wasTheOrderSaved}
        label='Was The Order Saved'
        name='orderSaved'
        onchange={(e) => setFormState({ ...formState, wasTheOrderSaved: e.target.value })}
      >
        <option value={''}>Select an Option</option>
        <option value={'yes'}>Yes</option>
        <option value={'no'}>No</option>
      </SelectInput>
      <Input
        name='emailedCustomerToSaveOrderDate'
        value={formState.emailedCustomerToSaveOrderDate}
        label='Emailed Customer to Save Order, Date'
        onchange={(e) => setFormState({ ...formState, emailedCustomerToSaveOrderDate: e.target.value })}
      />
      <Input
        required={false}
        name='orderCanceledWithWarehouseDate'
        value={formState.orderCancelledWithWarehouseDate}
        label='Order Cancelled with Warehouse, if Applicable, Date'
        onchange={(e) => setFormState({ ...formState, orderCancelledWithWarehouseDate: e.target.value })}
      />
      <Input
        required={false}
        name='productPartsNotifiedDate'
        value={formState.productionPartsNotifiedDate}
        label='Production/Parts Notified, if Applicable, Date'
        onchange={(e) => setFormState({ ...formState, productionPartsNotifiedDate: e.target.value })}
      />
      <Input
        name='orderMovedToRefundRequestedFolderInS4SDate'
        value={formState.orderMovedToRefundRequestedFolderInS4SDate}
        label='Order Moved to Refund Requested Folder in S4S, Date'
        onchange={(e) => setFormState({ ...formState, orderMovedToRefundRequestedFolderInS4SDate: e.target.value })}
      />
      <Input
        name='givenToDataAnalysisForLostSaleAccountabilityDate'
        value={formState.givenToDataAnalysisForLostSaleAccountabilityDate}
        label='Given to Data Analysis for Lost Sale Accountability, Date'
        onchange={(e) =>
          setFormState({ ...formState, givenToDataAnalysisForLostSaleAccountabilityDate: e.target.value })
        }
      />
      <Input
        label='Called Downloaded and Saved Date'
        value={formState.callsDownloadedAndSavedDate}
        onchange={(e) => setFormState({ ...formState, callsDownloadedAndSavedDate: e.target.value })}
        name='calledDownloadedDate'
      />
      <div className='grid grid-cols-2 items-center w-full gap-3'>
        <label className='underline underline-offset-4' htmlFor='isAdmin'>
          Approve or Deny
        </label>
        <div className='grid grid-cols-2 gap-3'>
          <button
            type='button'
            onClick={() => handleApprove()}
            className='bg-green-500 hover:bg-green-700 transition-all duration-200 ease-in-out px-2 py-3 rounded-md'
          >
            Approve
          </button>
          <button
            type='button'
            onClick={() => handleDenied()}
            className='bg-red-500 hover:bg-red-700 transition-all duration-200 ease-in-out px-2 py-3 rounded-md'
          >
            Deny
          </button>
        </div>
      </div>
      <button
        className='bg-trueBlue hover:bg-powderBlue hover:text-jet transition-all duration-200 ease-in-out w-full px-2 py-3 rounded-md'
        type='submit'
      >
        {loading ? 'Updating...' : 'Update'}
      </button>
    </form>
  );
}
