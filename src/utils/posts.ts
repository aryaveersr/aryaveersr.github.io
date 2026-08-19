export function postHref(id: string): string {
  return `/posts/${id}`;
}

export function stringifyDate(date: Date): string {
  return date.toLocaleDateString("en-CA");
}
