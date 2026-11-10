import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { debounce } from "./debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not call the function until the wait has elapsed", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced("a");
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("coalesces rapid calls into a single invocation", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1);
    vi.advanceTimersByTime(50);
    debounced(2);
    vi.advanceTimersByTime(50);
    debounced(3);
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
  });

  it("uses the default wait of 0", () => {
    const fn = vi.fn();
    const debounced = debounce(fn);

    debounced();
    vi.advanceTimersByTime(0);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("cancel prevents the pending call", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced.cancel();
    vi.advanceTimersByTime(200);

    expect(fn).not.toHaveBeenCalled();
  });

  it("flush invokes the pending call immediately", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced("x");
    debounced.flush();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("x");

    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("flush does nothing when nothing is pending", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced.flush();
    expect(fn).not.toHaveBeenCalled();
  });

  it("preserves the `this` context", () => {
    const fn = vi.fn(function (this: { value: number }) {
      return this.value;
    });
    const debounced = debounce(fn, 100);
    const context = { value: 42 };

    debounced.call(context);
    vi.advanceTimersByTime(100);

    expect(fn).toHaveLastReturnedWith(42);
  });
});
