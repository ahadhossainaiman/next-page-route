import { cn } from '@lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

const Preloader = React.forwardRef((_, ref: React.RefObject<HTMLDivElement>) => {
  return (
    <div
      ref={ref}
      className={cn(
        'fixed top-0 left-0 w-full h-full hidden items-center justify-center bg-[var(--color-secondary-bg)] opacity-0 z-[999] [&.active]:flex [&.active]:opacity-100',
        'preloader active',
      )}
    >
      <div className={cn('w-full max-w-56', 'preloader_inner')}>
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <g>
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
              style={{
                fill: 'none',
                stroke: '#ED1C24',
                strokeWidth: 10,
                strokeMiterlimit: 10,
                strokeLinecap: 'round',
              }}
              d="M100,132c0,7.9,1.9,15.4,5.3,21.9c8,15.4,24.1,26,42.6,26c18.6,0,34.7-10.6,42.6-26c3.4-6.6,5.3-14,5.3-21.9
		c0-26.5-21.5-47.9-47.9-47.9C121.4,84.1,100,105.6,100,132"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
              style={{
                fill: 'none',
                stroke: '#262262',
                strokeWidth: 10,
                strokeMiterlimit: 10,
                strokeLinecap: 'round',
              }}
              d="M147.9,65.6c1.1,0,2.2,0,3.3,0.1c1.2-0.1,2.4-0.1,3.6-0.1h105.7c5.8,0,11.5,0.6,17,1.8
		c35.5,7.8,62.1,39.4,62.1,77.3c0,21.8-8.9,41.6-23.2,55.9c-10.5,10.5-23.9,18.1-38.9,21.3c-5.5,1.2-11.1,1.8-17,1.8h-42.2v37h116.2
		c32.1,0,61.1-13,82.1-34c21-21,34-50,34-82.1c0-64.1-52-116.1-116.1-116.1H61.3c0.8,0.6,1.6,1.1,2.5,1.7h0c1.7,1.1,3.4,2.3,5,3.6
		c0,0,0,0,0,0c10.6,8.2,19.1,19.1,24.4,31.7c2.9,6.8,4.8,14.1,5.7,21.7C111,74,128.5,65.6,147.9,65.6"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
              style={{
                fill: 'none',
                stroke: '#262262',
                strokeWidth: 10,
                strokeMiterlimit: 10,
                strokeLinecap: 'round',
              }}
              d="M334.6,288.1h-16c13,14.1,21,32.9,21,53.6c0,21.8-8.9,41.6-23.2,55.9c-10.5,10.5-23.9,18.1-39,21.3
		c-5.5,1.2-11.1,1.8-17,1.8h-59.8V172.2c-5.8,7.7-13.2,14-21.6,18.5c-9.4,5-20.1,7.8-31.3,7.8c-11.2,0-21.8-2.8-31.3-7.8
		c-8.4-4.5-15.8-10.7-21.6-18.5v311.2h0.8c2.6-2.8,5.4-5.5,8.4-7.9c10.9-8.8,24.2-14.8,38.7-16.9c3.6-0.5,7.3-0.8,11-0.8h180.7
		c32.1,0,61.1-13,82.1-34c21-21,34-50,34-82.1c0-31.3-12.4-59.6-32.5-80.5C394.1,278.7,365.1,288.1,334.6,288.1"
            />
          </g>
        </svg>
      </div>
    </div>
  );
});

Preloader.displayName = 'Preloader';

export default Preloader;
