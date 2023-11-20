'use client';

import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { createForm } from '@/actions/sendForm';
import Input from './Input';

export type FormType = {
  refundType: string;
  paymentMethod: string;
  refundAmount: string;
  amountDeduction: string;
  todaysDate: string;
  dateOfOrder: string;
  orderNumber: string;
  productSpecialistSoldOrder: string;
  customerName: string;
  employeeFillingOutForm: string;
  reasonForRefund: string[];
  typeOfReturn: string;
  managerThatSpokeToCustomer: string;
  wasTheOrderSaved: string;
  managerSpokeDate: string;
  emailedCustomerToSaveOrderDate: string;
  orderCancelledWithWarehouseDate: string;
  productionPartsNotifiedDate: string;
  refundSubmittedInAlfabotDate: string;
  orderMovedToRefundRequestedFolderInS4SDate: string;
  givenToDataAnalysisForLostSaleAccountabilityDate: string;
  callsDownloadedAndSavedDate: string;
  generalManagerSignOff: string;
};

export default function RefundForm() {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<FormType>({
    refundType: '',
    paymentMethod: '',
    refundAmount: '',
    amountDeduction: 'order in full',
    todaysDate: '',
    dateOfOrder: '',
    orderNumber: '',
    productSpecialistSoldOrder: '',
    customerName: '',
    employeeFillingOutForm: '',
    reasonForRefund: [],
    typeOfReturn: '',
    managerThatSpokeToCustomer: '',
    wasTheOrderSaved: '',
    managerSpokeDate: '',
    emailedCustomerToSaveOrderDate: '',
    orderCancelledWithWarehouseDate: '',
    productionPartsNotifiedDate: '',
    refundSubmittedInAlfabotDate: '',
    orderMovedToRefundRequestedFolderInS4SDate: '',
    givenToDataAnalysisForLostSaleAccountabilityDate: '',
    callsDownloadedAndSavedDate: '',
    generalManagerSignOff: ''
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    if (!confirm('Are you sure you want to submit this form?')) return setLoading(false);
    const success = await createForm(formState);
    if (success) {
      alert('Form submitted successfully');
      setFormState({
        refundType: '',
        paymentMethod: '',
        refundAmount: '',
        amountDeduction: 'order in full',
        todaysDate: '',
        dateOfOrder: '',
        orderNumber: '',
        productSpecialistSoldOrder: '',
        customerName: '',
        employeeFillingOutForm: '',
        reasonForRefund: [],
        typeOfReturn: '',
        managerThatSpokeToCustomer: '',
        wasTheOrderSaved: '',
        managerSpokeDate: '',
        emailedCustomerToSaveOrderDate: '',
        orderCancelledWithWarehouseDate: '',
        productionPartsNotifiedDate: '',
        refundSubmittedInAlfabotDate: '',
        orderMovedToRefundRequestedFolderInS4SDate: '',
        givenToDataAnalysisForLostSaleAccountabilityDate: '',
        callsDownloadedAndSavedDate: '',
        generalManagerSignOff: ''
      });
      setLoading(false);
    } else {
      alert('Something went wrong, please try again');
      setLoading(false);
    }
  }

  return (
    <form className='flex w-full flex-col items-center gap-4' onSubmit={(e) => handleSubmit(e)}>
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
        label="Today's Date"
        name='todaysDate'
        value={formState.todaysDate}
        onchange={(e) => setFormState({ ...formState, todaysDate: e.target.value })}
      />
      <Input
        label='Order Date'
        name='orderDate'
        value={formState.dateOfOrder}
        onchange={(e) => setFormState({ ...formState, dateOfOrder: e.target.value })}
      />
      <Input
        label='Order Number'
        name='orderNumber'
        value={formState.orderNumber}
        onchange={(e) => setFormState({ ...formState, orderNumber: e.target.value })}
      />
      <Input
        label='Product Specialist Who Sold Order'
        name='productSpecialistSoldOrder'
        value={formState.productSpecialistSoldOrder}
        onchange={(e) => setFormState({ ...formState, productSpecialistSoldOrder: e.target.value })}
      />
      <Input
        label='Customer Name'
        name='customerName'
        value={formState.customerName}
        onchange={(e) => setFormState({ ...formState, customerName: e.target.value })}
      />
      <Input
        label='Employee Filing Out Form'
        name='employeeFillingOutForm'
        value={formState.employeeFillingOutForm}
        onchange={(e) => setFormState({ ...formState, employeeFillingOutForm: e.target.value })}
      />
      <MultiSelectDropdown formState={formState} setFormState={setFormState} />
      <SelectInput
        value={formState.typeOfReturn}
        label='Product Type'
        name='productType'
        onchange={(e) => setFormState({ ...formState, typeOfReturn: e.target.value })}
      >
        <option value={'parts'}>Parts</option>
        <option value={'torque converter'}>Torque Converter</option>
        <option value={'custom transmission'}>Custom Transmission</option>
        <option value={'qs'}>QuickShip</option>
        <option value={'engine'}>Engine</option>
        <option value={'transfer case'}>Transfer Case</option>
      </SelectInput>
      <Input
        label='Manager That Spoke to Customer'
        name='managerThatSpokeToCustomer'
        onchange={(e) => setFormState({ ...formState, managerThatSpokeToCustomer: e.target.value })}
        value={formState.managerThatSpokeToCustomer}
      />
      <Input
        label='Date Manager Spoke to Customer'
        name='dateManagerSpokeToCustomer'
        onchange={(e) => setFormState({ ...formState, managerSpokeDate: e.target.value })}
        value={formState.managerSpokeDate}
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
        name='refundSubmittedInAlfabotDate'
        value={formState.refundSubmittedInAlfabotDate}
        label='Refund Submitted In Alfabot, Date'
        onchange={(e) => setFormState({ ...formState, refundSubmittedInAlfabotDate: e.target.value })}
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
        name='callsDownloadedAndSavedDate'
        value={formState.callsDownloadedAndSavedDate}
        label='Calls Downloaded and Saved, Date'
        onchange={(e) => setFormState({ ...formState, callsDownloadedAndSavedDate: e.target.value })}
      />
      <Input
        name='generalManagerSignOff'
        value={formState.generalManagerSignOff}
        label='General Manager Sign Off, Date'
        onchange={(e) => setFormState({ ...formState, generalManagerSignOff: e.target.value })}
      />
      <button
        className='bg-trueBlue hover:bg-powderBlue hover:text-jet transition-all duration-200 ease-in-out w-full px-2 py-3 rounded-md'
        type='submit'
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

interface SelectProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'date' | 'email';
  value: string;
  onchange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  children: React.ReactNode;
  multiple?: boolean;
}

function SelectInput({ label, name, value, onchange, required = true, children, multiple = false }: SelectProps) {
  return (
    <div className='grid grid-cols-2 items-center w-full'>
      <label className='underline underline-offset-4' htmlFor={name}>
        {label}:
      </label>
      <select
        multiple={multiple}
        className='bg-dukeBlue rounded-md px-2 py-3 outline-none cursor-pointer'
        name={name}
        onChange={onchange}
        required={required}
        value={value}
      >
        {children}
      </select>
    </div>
  );
}

function MultiSelectDropdown({
  formState,
  setFormState
}: {
  formState: FormType;
  setFormState: React.Dispatch<React.SetStateAction<FormType>>;
}) {
  const options = [
    'Going Local',
    'No Longer Needed',
    'Selling Vehicle',
    'Reviews',
    'Ship Time',
    'Quantity',
    'Goods Not as Described',
    'Unknown Charge',
    'Credit Requested',
    'Other'
  ];

  return (
    <Listbox
      value={formState.reasonForRefund}
      onChange={(value) => setFormState({ ...formState, reasonForRefund: value })}
      multiple
    >
      <div className='grid grid-cols-2 items-center w-full '>
        <label htmlFor='assignedTo' className='underline underline-offset-4'>
          Reason(s) for Refund:
        </label>
        <div className='relative'>
          <Listbox.Button className={`bg-dukeBlue rounded-md cursor-pointer outline-none p-3 w-full `}>
            {formState.reasonForRefund.length === 0
              ? 'Please select at least one reason'
              : formState.reasonForRefund.join(', ')}
          </Listbox.Button>
          <Listbox.Options className='absolute z-10 mt-1 bg-ghostBlue border border-darkAqua rounded-md shadow-lg max-h-60 overflow-y-auto focus:outline-none'>
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                value={option}
                className={({ active }) =>
                  `${
                    active ? 'text-jet bg-powderBlue' : 'bg-dukeBlue'
                  } cursor-pointer select-none relative py-2 pl-10 pr-4`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{option}</span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-darkAqua'>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
                        </svg>
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </div>
    </Listbox>
  );
}
