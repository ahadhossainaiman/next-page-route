import { cn } from '@lib/utils';
import React from 'react';

interface IProps {
  className?: string;
  subtitleClassName?: string;
  titleWrapperClassName?: string;
  titlePrefixClassName?: string;
  titleClassName?: string;
  subtitle?: React.ReactNode;
  isAfterSubtitle?: boolean;
  titlePrefix?: React.ReactNode;
  title: React.ReactNode;
  isTitleShape?: boolean;
}
const SectionIntro = ({
  className,
  subtitleClassName,
  titleWrapperClassName,
  titlePrefixClassName,
  titleClassName,
  subtitle,
  isAfterSubtitle = false,
  titlePrefix,
  title,
  isTitleShape = false,
}: IProps) => {
  return (
    <div className={cn('section_intro', className)}>
      <div className="intro_wrapper">
        {isAfterSubtitle || (subtitle && <p className={cn('intro_subtitle', subtitleClassName)}>{subtitle}</p>)}
        <h2 className={cn('intro_title_wrapper space-x-2.5', titleWrapperClassName)}>
          {titlePrefix && (
            <span
              className={cn(
                'intro_title_prefix text-2xl md:text-3xl xl:text-4xl font-semibold text-transparent [-webkit-text-stroke-width:_1px] [-webkit-text-stroke-color:_#111] dark:[-webkit-text-stroke-color:_#fff]',
                titlePrefixClassName,
              )}
            >
              {titlePrefix}
            </span>
          )}
          <span
            className={cn(
              'intro_title text-3xl md:text-4xl xl:text-5xl font-semibold relative',
              {
                'text-[var(--color-black)] before:content-[""] before:absolute before:-inset-1 before:-skew-y-3 before:bg-sky-500 dark:before:bg-sky-100':
                  isTitleShape,
              },
              titleClassName,
            )}
          >
            <span className="relative">{title}</span>
          </span>
        </h2>
        {isAfterSubtitle && subtitle && <p className={cn('intro_subtitle', subtitleClassName)}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default SectionIntro;
