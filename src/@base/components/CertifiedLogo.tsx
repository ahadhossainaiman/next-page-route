import { Env } from '.environments';
import { ImagePaths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import React from 'react';

interface IProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const CertifiedLogo: React.FC<IProps> = ({ className, width = 180, height = 50 }) => {
  return (
    <div className="bg-gray-300 dark:bg-black/50 p-1 rounded-lg">
      <p>Certified By</p>
      <img
        width={width}
        height={height}
        src={ImagePaths.certifiedLogo}
        alt={`${Env.webTitle ? Toolbox.toLowerText(Env.webTitle) + ' ' : ''}logo`}
        className={className}
      />
    </div>
  );
};

export default CertifiedLogo;
