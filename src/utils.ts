import { DependencyList, useCallback, useRef } from "react";

export function useDebounce<T extends(...args: any[]) => any>(
  func: T,
  delay: number,
  deps: DependencyList = [],
): [T, () => void] {
  const timer = useRef<number>();
  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const run = useCallback((...args) => {
    cancel();
    timer.current = window.setTimeout(() => {
      func(...args);
    }, delay);
  }, deps);
  return [run as T, cancel];
}