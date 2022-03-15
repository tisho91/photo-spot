import { useEffect } from 'react';
import { attachEvent } from './utils';

export const useOutsideClick = (ref: any, cb: () => void) => {

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (ref?.current && !ref?.current.contains(event.target)) {
                cb()
            }
        }
        attachEvent('mousedown', handleClickOutside);
        return () => {
            attachEvent('mousedown', handleClickOutside);
        };
    }, [ ref ]);
}
