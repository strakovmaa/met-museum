// https://www.dhiwise.com/post/ultimate-guide-to-implementing-react-debounce-effectively

import { useEffect, useState } from "react";

export const useDebouncedValue = (
  inputValue: string,
  delay: number
): string => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};
