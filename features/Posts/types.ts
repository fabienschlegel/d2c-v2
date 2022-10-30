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
  coverImage?: string;
  tags?: Array<string>;
  related?: Array<PostSummary>;
}

export type PostAnchor = Pick<IPost, 'title' | 'slug'>;

export type PostSummary = Omit<IPost, 'content'>;
