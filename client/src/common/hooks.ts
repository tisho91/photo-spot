import { useEffect } from 'react';
import { attachEvent } from './utils';

export const useOutsideClick = (ref: any, cb: () => void): any => {
  useEffect(() => {
    const handleClickOutside = (event: Event): any => {
      if (ref?.current && !ref?.current.contains(event.target)) {
        cb();
      }
    };
    attachEvent('mousedown', handleClickOutside);
    return (): any => {
      attachEvent('mousedown', handleClickOutside);
    };
  }, [ref]);
};
