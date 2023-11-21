import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { RefundFormType } from '../../../types/refundForm';
import Chart from '../components/Chart';

export default async function Page() {
  const supabase = createServerComponentClient(
    { cookies },
    { supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API, supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const userEmail = user?.email;

  const { data: isAdmin } = await supabase.from('whitelist').select('isAdmin').match({ email: userEmail }).single();

  if (!isAdmin?.isAdmin) redirect('/');

  const { data } = await supabase.from('refundRequests').select('*').match({ reviewed: false });
  console.log(data);

  return (
    <div>
      <Chart forms={data as RefundFormType[]} />
    </div>
  );
}
