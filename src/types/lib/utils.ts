export type Default<
  T extends D | undefined,
  D extends string | number
> = T extends D ? T : D;

export type S<T extends string | undefined> = Default<T, string>;

export type N<T extends number | undefined> = Default<T, number>;

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type WithIncluded<T> = Expand<T & { included: [] }>;
