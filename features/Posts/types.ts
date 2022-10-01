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
  tags?: Array<string>;
}

export type PostAnchor = Pick<IPost, "title" | "slug">;

export type PostSummary = Omit<IPost, "content">;
