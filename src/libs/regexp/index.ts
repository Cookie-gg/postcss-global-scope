export const REGEXP = {
  GLOBAL: /:global\((.*?)\)/,
  SPLIT: (syntax: string, flags?: string) => new RegExp(`\\s*\\${syntax}\\s*`, flags),
};
