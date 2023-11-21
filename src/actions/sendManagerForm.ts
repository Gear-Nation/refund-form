'use server';

import { ManagerFormType } from '@/app/components/ManagerRefundForm';
import { supabase } from '@/app/utils/supabase';

export async function sendManagerForm(formState: ManagerFormType, name: string, id: string) {
  if (formState.reviewed) {
    formState.generalManagerSignOff = name;
  }

  const { error } = await supabase.from('refundRequests').update([formState]).match({ id });
  if (error) {
    return false;
  } else {
    return true;
  }
}
