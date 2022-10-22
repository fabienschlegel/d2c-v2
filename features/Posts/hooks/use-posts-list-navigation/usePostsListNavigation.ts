import { useEffect, useState } from 'react';

import { POSTS_PER_PAGE } from 'features/Posts/constants';

import { PostSummary } from 'features/Posts/types';

interface UsePostsListNavigation {
  paginatedPosts: PostSummary[];
  previous: boolean;
  next: boolean;
  previousPage: () => void;
  nextPage: () => void;
}

const usePostsListNavigation = (posts: PostSummary[]): UsePostsListNavigation => {
  const [paginatedPosts, setPaginatedPosts] = useState<PostSummary[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState(1);
  const [previous, setPrevious] = useState(false);
  const [next, setNext] = useState(false);

  useEffect(() => {
    if (currentPage === 1) {
      setPaginatedPosts(posts.slice(0, POSTS_PER_PAGE));
    } else {
      setPaginatedPosts(
        posts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)
      );
    }
  }, [currentPage, posts]);

  useEffect(() => {
    setLastPage(Math.ceil(posts.length / POSTS_PER_PAGE));
  }, [posts]);

  useEffect(() => {
    if (currentPage > 1) setPrevious(true);
    if (currentPage === 1) setPrevious(false);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage < lastPage) setNext(true);
    if (currentPage === lastPage) setNext(false);
  }, [currentPage, lastPage]);

  const previousPage = () => setCurrentPage((prevState) => prevState - 1);

  const nextPage = () => setCurrentPage((prevState) => prevState + 1);

  return { paginatedPosts, previous, next, previousPage, nextPage };
};

export default usePostsListNavigation;
