/** Returns the basePath prefix (e.g. "/musev2" in production, "" in dev). */
export function basePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
}

/** Prefix a public asset path with the basePath. */
export function asset(path: string): string {
  return `${basePath()}${path}`;
}
