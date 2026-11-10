/**
 * A debounced wrapper around a function, created by {@link debounce}.
 *
 * Call it like the wrapped function (args are forwarded, return value
 * discarded) and use `cancel`/`flush` to control the pending invocation.
 */
export interface DebouncedFunction<F extends (...args: never[]) => unknown> {
  (...args: Parameters<F>): void;
  /** Cancels the pending invocation without calling the wrapped function. */
  cancel: () => void;
  /** Runs the pending invocation immediately, using the latest arguments. */
  flush: () => void;
}

/**
 * Returns a trailing-edge debounced version of a function: only the *last*
 * call within a burst runs, after `wait` ms of silence.
 *
 * Useful for handlers that fire rapidly (search inputs, resize/scroll
 * handlers) where only the final invocation matters. Late calls override
 * earlier ones — the wrapper always invokes the wrapped function with the
 * most recent `this` and arguments. Note the wrapped function's return
 * value is discarded; usecallbacks needing results should re-read via refs.
 *
 * @param fn - The function to debounce.
 * @param wait - Quiet period in milliseconds after the last call before
 * `fn` runs. Defaults to `0`.
 * @returns A debounced callable with a `cancel` and `flush` method.
 *
 * @example
 * const search = debounce((term: string) => api.search(term), 300);
 *
 * search("we");   // scheduled
 * search("wedo"); // previous schedule cancelled, new one armed
 * search.flush(); // forces the call now with ["wedo"]
 *
 * search.cancel(); // drop the pending call entirely
 */
export function debounce<F extends (...args: never[]) => unknown>(fn: F, wait = 0): DebouncedFunction<F> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<F> | undefined;
  let lastThis: unknown;

  const debounced = function (this: unknown, ...args: Parameters<F>) {
    lastThis = this;
    lastArgs = args;
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = undefined;
      if (lastArgs !== undefined) {
        fn.apply(lastThis, lastArgs);
      }
    }, wait);
  } as DebouncedFunction<F>;

  debounced.cancel = () => {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
    timeout = undefined;
  };

  debounced.flush = () => {
    if (timeout !== undefined && lastArgs !== undefined) {
      clearTimeout(timeout);
      timeout = undefined;
      fn.apply(lastThis, lastArgs);
    }
  };

  return debounced;
}
