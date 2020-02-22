export function assertNonNullable<T>(v: T, message?: string): asserts v is NonNullable<T> {
  if (v === null || v === undefined) { throw new Error(message ?? 'value must be non-nullable') }
};
