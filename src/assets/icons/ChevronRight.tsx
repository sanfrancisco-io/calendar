import { type SVGProps } from 'react';
import * as React from 'react';

type IconProps = SVGProps<SVGElement>;

export const ChevronRight: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={`size-7 ${className}`}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
    </svg>
  );
};
