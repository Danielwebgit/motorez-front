import { useRef } from 'react';

export default function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
    const timeoutRef = useRef<number | undefined>(undefined);

    function debounceFn(...args: Parameters<T>): void {
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            fn(...args);
        }, delay);
    }

    return debounceFn;
}
