import { FunctionComponent } from 'react';

import { useTranslation } from 'next-i18next';

import { Heading } from '@the-sleeping-dog/react-components';

import { LargeSummaryCard } from 'features/Posts/components';

import { PostSummary } from 'features/Posts/types';

import styles from './PostRelatedArticles.module.scss';

interface PostRelatedArticlesProps {
  relatedArticles: PostSummary[];
}

export type PostRelatedArticlesType = FunctionComponent<PostRelatedArticlesProps>;

const PostRelatedArticles: PostRelatedArticlesType = ({ relatedArticles }) => {
  const { t } = useTranslation('posts');
  return (
    <div className="flex flex-col mt-55">
      <Heading headingLevel="h2" className={styles.header}>
        {t('relatedArticles')}
      </Heading>
      <hr className={styles.divider} />
      <div className={styles['articles-grid']}>
        {relatedArticles.map((related) => (
          <div key={related.slug} className={styles['grid-item']}>
            <LargeSummaryCard
              title={related.title}
              excerpt={related.excerpt}
              slug={related.slug}
              coverImageSrc={related.coverImage}
              readingTime={related.readingTime}
              locale={related.locale}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostRelatedArticles;
