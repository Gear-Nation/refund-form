import Link from 'next/link';
import React from 'react';
import DropdownMenu from './DropdownMenu';

export default function Header() {
  return (
    <header className='w-full bg-trueBlue/75 backdrop-blur-md text-xl fixed top-0 p-5 z-50'>
      <nav className='w-full flex items-center max-w-7xl mx-auto'>
        <Link href='/'>
          <p>Refund Form</p>
        </Link>
        <div className='flex-1' />
        <DropdownMenu />
      </nav>
    </header>
  );
}
