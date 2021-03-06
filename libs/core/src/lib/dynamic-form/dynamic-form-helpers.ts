export function cloneObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function extendObject<T>(obj: T, paths: string[]): T {
  return paths.reduce((result, path) => {
    result[path] = result[path] || {};
    return result[path];
  }, obj) as T;
}
