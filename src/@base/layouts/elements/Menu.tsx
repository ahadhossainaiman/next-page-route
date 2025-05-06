import { cn } from '@lib/utils';
import { Button } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { menuItems } from './menuItems';

interface MenuProps {
  isOpen: boolean;
  onChangeOpen: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onChangeOpen }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'fixed top-0 right-0 flex items-center justify-center backdrop-blur-2xl h-full py-16 overflow-x-hidden z-[299] transition-[width] duration-500 w-0',
        {
          'w-80': isOpen,
        },
      )}
    >
      <div className="absolute top-5 left-1/2 -translate-x-1/2">
        <Button type="dashed" onClick={onChangeOpen}>
          <FaTimes />
        </Button>
      </div>
      <div className="px-10">
        <ul className="font-medium text-white text-center space-y-2">
          {menuItems.map(({ name, path }, idx) => {
            const isActive = pathname === path;

            return (
              <li key={idx} onClick={onChangeOpen}>
                <Link
                  href={path}
                  className={cn('whitespace-nowrap hover:text-[var(--color-primary)] transition-colors duration-500', {
                    'text-[var(--color-primary)]': isActive,
                  })}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
