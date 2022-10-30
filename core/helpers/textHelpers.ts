import { WORDS_PER_MINUTE } from 'core/constants';

export function textEllipsis(text: string, size = 28) {
  if (text.length > size) return `${text.slice(0, size)}...`;
  return text;
}

export const uppercaseFirst = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / WORDS_PER_MINUTE);
}
