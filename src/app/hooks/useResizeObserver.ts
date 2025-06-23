import { useEffect } from "react";

type Callback = (element: Element) => void;

export function useResizeObserver(
  ref: React.RefObject<Element | null>,
  callback: Callback,
) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(() => {
      if (ref.current) {
        callback(ref.current);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback]);
}
