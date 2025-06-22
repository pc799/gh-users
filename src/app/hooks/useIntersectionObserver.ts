import { useEffect } from "react";

type Callback = () => void;

export function useIntersectionObserver(
  ref: React.RefObject<Element | null>,
  callback: Callback,
) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      { threshold: 1 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback]);
}
