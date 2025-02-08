/**
 * useClickOutside.ts
 * A custom hook that handles click outside events for components like dropdowns and modals.
 * @param ref - Reference to the element to watch for outside clicks
 * @param handler - Callback function to execute when a click outside occurs
 */

import { RefObject, useEffect } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
