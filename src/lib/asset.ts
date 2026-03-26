const BASE_PATH = process.env.NODE_ENV === "production" ? "/portfolio" : "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
