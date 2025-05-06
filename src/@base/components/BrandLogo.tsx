import { Env } from '.environments';
import { ImagePaths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import React from 'react';

interface IProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const BrandLogo: React.FC<IProps> = ({ className, width = 180, height = 50 }) => {
  return (
    <img
      width={width}
      height={height}
      src={ImagePaths.logo}
      alt={`${Env.webTitle ? Toolbox.toLowerText(Env.webTitle) + ' ' : ''}logo`}
      className={className}
    />
  );
};

export default BrandLogo;
