import { useEffect, useState } from "react";

const useDebounce = (value, delay, withNull = false) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (value.length > 0 || withNull) {
                setDebouncedValue(value);
            }
        }, delay);

        return () => {
            clearTimeout(timeout);
        }
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;