'use client';

import { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { createForm } from '@/actions/sendForm';
import Input from './Input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import SelectInput from './SelectInput';

export type FormType = {
  dateOfOrder: string;
  orderNumber: string;
  productSpecialistSoldOrder: string;
  customerName: string;
  reasonForRefund: string[];
  typeOfReturn: string;
};

export default function RefundForm() {
  const [loading, setLoading] = useState(false);
  const [employeeName, setEmployeeName] = useState('' as string | undefined | null);
  const [formState, setFormState] = useState<FormType>({
    dateOfOrder: '',
    orderNumber: '',
    productSpecialistSoldOrder: '',
    customerName: '',
    reasonForRefund: [],
    typeOfReturn: ''
  });

  const supabase = createClientComponentClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
  });

  useEffect(() => {
    async function getEmployeeName() {
      const userEmail = (await supabase.auth.getUser()).data.user?.email;

      const { data } = await supabase.from('employees').select('name').match({ email: userEmail }).single();
      setEmployeeName(data?.name);
    }
    getEmployeeName();
  }, [supabase]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    if (!confirm('Are you sure you want to submit this form?')) return setLoading(false);

    const success = await createForm(formState, employeeName!);
    if (success) {
      alert('Form submitted successfully');
      setFormState({
        dateOfOrder: '',
        orderNumber: '',
        productSpecialistSoldOrder: '',
        customerName: '',
        reasonForRefund: [],
        typeOfReturn: ''
      });
      setLoading(false);
    } else {
      alert('Something went wrong, please try again');
      setLoading(false);
    }
  }

  return (
    <form className='flex w-full flex-col items-center gap-4' onSubmit={(e) => handleSubmit(e)}>
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
      <button
        className='bg-trueBlue hover:bg-powderBlue hover:text-jet transition-all duration-200 ease-in-out w-full px-2 py-3 rounded-md'
        type='submit'
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
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
