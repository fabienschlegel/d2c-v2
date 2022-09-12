import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  return slugs.map((slug) => getPostBySlug(slug, fields));
}

export function getAllPostsByDate(fields: string[] = []) {
  return getAllPosts(fields).sort((post1, post2) =>
    post1.date > post2.date ? -1 : 1
  );
}

export function getPostsByTag(tag: string, fields: string[] = []) {
  return getAllPostsByDate(fields).filter((post) => post.tags.includes(tag));
}

export function getAllTags(): Array<string> {
  const allPosts = getAllPosts(["slug", "tags"]);

  const flattenTags = allPosts.map((post) => post?.tags).flat();

  const allTags = flattenTags.filter(
    (item, pos) => flattenTags.indexOf(item) == pos
  );
  console.log({ allTags });

  return allTags;
}

export function getNextPost(slug: string) {
  const allPosts = getAllPostsByDate(["title", "slug", "date"]);

  const index = allPosts.map((post) => post.slug).indexOf(slug);

  if (index === allPosts.length - 1 || index === -1) return null;

  return allPosts[index + 1];
}

export function getPreviousPost(slug: string) {
  const allPosts = getAllPostsByDate(["title", "slug", "date"]);

  const index = allPosts.map((post) => post.slug).indexOf(slug);

  if (index === 0 || index === -1) return null;

  return allPosts[index - 1];
}
