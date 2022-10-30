import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import remarkUnwrapImages from 'remark-unwrap-images';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    // * Remove p tag around img
    .use(remarkUnwrapImages)
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown);
  return result.toString();
}
