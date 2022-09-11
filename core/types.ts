export interface SubNavItem {
  label: string;
  subLabel?: string;
  href?: string;
}

export interface INavItem {
  label: string;
  subLabel?: string;
  children?: Array<SubNavItem>;
  href?: string;
}

interface IAuthor {
  name: string;
  avatar: string;
}

export interface IPost {
  title: string;
  date: string;
  slug: string;
  author: IAuthor;
  excerpt: string;
  content: string;
  coverImage?: string;
  ogImage?: string;
  tags?: Array<string>;
}

export type PostAnchor = Pick<IPost, "title" | "slug">;

export type PostSummary = Omit<IPost, "content">;
