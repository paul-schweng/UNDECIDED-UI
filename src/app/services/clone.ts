export function clone<TResult>(object: TResult): TResult {
  return JSON.parse(JSON.stringify(object)) as TResult;
}
