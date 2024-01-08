'use client';

import { approveForm } from '@/actions/sendManagerForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MoveToAlfabot({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        setLoading(true);
        const success = await approveForm(id);
        if (success) alert('Successfully moved to Alfabot!');
        else alert('Something went wrong, please try again.');
        router.refresh();
        setLoading(false);
      }}
      className='bg-green-500 text-jet w-full rounded-md px-2 py-3 hover:bg-green-700 transition-all duration-200 ease-in-out'
    >
      {loading ? 'Submitting...' : 'Move to Alfabot and Complete Request'}
    </button>
  );
}
