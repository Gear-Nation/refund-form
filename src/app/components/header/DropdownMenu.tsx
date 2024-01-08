'use client';

import { Menu, Transition } from '@headlessui/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import DropdownMenuItem from './DropdownMenuItem';

export default function DropdownMenu() {
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClientComponentClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
  });
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  useEffect(() => {
    async function checkAdmin() {
      const user = await supabase.auth.getUser();
      const email = user?.data?.user?.email;

      const { data: isAdmin } = await supabase.from('whitelist').select('isAdmin').match({ email }).single();
      setIsAdmin(isAdmin?.isAdmin);
    }

    checkAdmin();
  }, [supabase]);

  return (
    <Menu as={'div'} className='relative inline-block text-left'>
      <div>
        <Menu.Button
          className={
            'bg-dukeBlue inline-flex text-ivory hover:text-jet justify-center rounded-md border border-ivory p-2 text-sm font-medium shadow-sm hover:bg-powderBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-100 transition-all'
          }
          aria-label='menu'
        >
          <IoMenu className='w-6 h-6' />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          className={
            'absolute right-0 z-20 mt-2 md:w-52 w-40 origin-top-right rounded-md border border-zinc-400 bg-jet ring-1 ring-black ring-opacity-5 focus:outline-none divide-zinc-400'
          }
        >
          <div className='py-1'>
            {isAdmin && <DropdownMenuItem href={'/create-user'}>Create User</DropdownMenuItem>}
            {isAdmin && <DropdownMenuItem href='/view-forms'>View Unfulfilled Forms</DropdownMenuItem>}
            {isAdmin && <DropdownMenuItem href='/approved-forms'>View Approved Forms</DropdownMenuItem>}
            {isAdmin && <DropdownMenuItem href='/completed-forms'>View Completed Forms</DropdownMenuItem>}
            {isAdmin && <DropdownMenuItem href='/denied-forms'>View Denied Forms</DropdownMenuItem>}
            <Menu.Button
              className={
                'transition-all duration-200 ease-in-out block px-4 py-2 text-sm hover:bg-powderBlue text-ivory hover:text-jet hover:no-underline w-full text-left'
              }
              onClick={handleSignOut}
            >
              Sign Out
            </Menu.Button>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
