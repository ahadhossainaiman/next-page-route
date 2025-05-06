import { Paths } from '@lib/constant';
import { cn } from '@lib/utils';
import { ClassValue } from 'clsx';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { VscHome } from 'react-icons/vsc';

export interface IBreadcrumb {
  slug: string;
  name: string;
}

interface IProps {
  className?: ClassValue;
  items: IBreadcrumb[];
}

const Breadcrumb: React.FC<IProps> = ({ className, items }) => {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      <li className="breadcrumb_link">
        <Link href={Paths.root}>
          <VscHome size={24} className="dark:text-gray-300" />
        </Link>
      </li>
      {items.map((item, idx) => (
        <React.Fragment key={item.name}>
          <li className="breadcrumb_separator dark:text-gray-300">
            <IoIosArrowForward size={18} />
          </li>
          <li
            className={cn('breadcrumb_link dark:text-gray-300 capitalize', {
              'active text-[var(--color-primary)]': idx === items.length - 1,
            })}
          >
            <Link href={item.slug}>{item.name}</Link>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Breadcrumb;
