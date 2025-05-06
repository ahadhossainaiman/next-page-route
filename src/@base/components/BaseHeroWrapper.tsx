import React from 'react';
import Breadcrumb, { IBreadcrumb } from './Breadcrumb';

interface IProps {
  title: string;
  subTitle?: string;
  breadcrumb: IBreadcrumb[];
}

const BaseHeroWrapper: React.FC<IProps> = ({ title, subTitle, breadcrumb }) => {
  return (
    <div
      className="relative h-60 bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-gray-100/90 dark:before:bg-[var(--color-black)] before:z-[-1]"
      style={{ backgroundImage: 'url(/images/hero_wrapper_pattern.png)' }}
    >
      <div className="container h-full">
        <div className="flex flex-col justify-center items-center h-full text-center">
          <h2 className="capitalize font-bold text-4xl text-gray-900 dark:text-[var(--color-white)]">{title}</h2>
          {subTitle && <p className="text-gray-600 dark:text-gray-300 mt-2">{subTitle}</p>}
          <Breadcrumb className="mt-4" items={breadcrumb} />
        </div>
      </div>
    </div>
  );
};

export default BaseHeroWrapper;
