'use server';

import { FormType } from '@/app/components/RefundForm';
import { supabase } from '@/app/utils/supabase';

export async function createForm(formState: FormType, name: string) {
  const { error } = await supabase.from('refundRequests').insert([{ ...formState, employeeFillingOutForm: name }]);
  if (error) {
    console.log(error);
    return false;
  } else {
    return true;
  }
}
