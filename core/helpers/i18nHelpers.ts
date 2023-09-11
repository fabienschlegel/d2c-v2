export function setLocaleCookie(locale: string) {
  document.cookie = `NEXT_LOCALE=${locale}; max-age=2147483647; path=/`;
}
