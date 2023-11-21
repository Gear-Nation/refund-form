import { Menu } from '@headlessui/react';
import Link from 'next/link';

interface DropdownMenuItemProps {
  href: string;
  children: React.ReactNode;
  target?: '_self' | '_blank' | '_parent' | '_top';
  additionalClasses?: string;
}

export default function DropdownMenuItem({ href, children, target = '_self' }: DropdownMenuItemProps) {
  return (
    <Menu.Item>
      <Link
        target={target}
        href={href}
        className={
          'block px-4 py-2 text-sm hover:bg-powderBlue text-ivory hover:text-jet transition-all duration-200 ease-in-out hover:no-underline'
        }
      >
        {children}
      </Link>
    </Menu.Item>
  );
}
