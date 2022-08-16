import { useEffect } from 'react';

export default function useDocumentListener(
  event: string,
  handler: (event: Event) => void,
) {
  useEffect(() => {
    document.addEventListener(event, handler);

    return () => {
      document.removeEventListener(event, handler);
    };
  }, [event, handler]);
}
