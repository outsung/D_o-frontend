export default {
  delete: (name: string): void => sessionStorage.removeItem(name),
  set: (name: string, value: string): void =>
    sessionStorage.setItem(name, value),
  get: (name: string): string => sessionStorage.getItem(name) || '',
};
