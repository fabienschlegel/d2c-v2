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
  readingTime: string;
  locale: string;
  pageTitle?: string;
  coverImage?: string;
  tags?: Array<string>;
  related?: Array<PostSummary>;
  updated?: string;
}

export type PostAnchor = Pick<IPost, 'title' | 'slug'>;

export type PostSummary = Omit<IPost, 'content'>;

interface Alternate {
  slug: string;
  locale: string;
}

export type Alternates = Alternate[];
