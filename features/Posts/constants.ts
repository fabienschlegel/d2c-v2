export const POSTS_PER_PAGE = 5;

export const POST_HEADER_FIELDS = [
  'title',
  'date',
  'slug',
  'author',
  'excerpt',
  'coverImage',
  'tags',
  'related',
  'readingTime',
];

export const POST_ALL_FIELDS = [...POST_HEADER_FIELDS, 'content'];
