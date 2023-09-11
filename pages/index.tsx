import type { NextPage } from 'next';

import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getAllPostsByDateWithLocale } from 'features/Posts/api';

import generateRssFeed from 'core/utilities/generateRSSFeed';

import { PrimaryLayout } from 'features/Layout';

import { Hero, HomeLastPosts } from 'features/HomePage';

import { PostSummary } from 'features/Posts/types';

import { SITE_IMAGE, SITE_NAME } from 'core/constants';
import { POST_HEADER_FIELDS } from 'features/Posts';

interface HomeProps {
  lastPosts: Array<PostSummary>;
}

const Home: NextPage<HomeProps> = ({ lastPosts }) => {
  const { t } = useTranslation('common');
  const { t: homeT } = useTranslation('home');
  return (
    <PrimaryLayout
      pageTitle={`${SITE_NAME} - ${homeT('pageTitle')}`}
      pageMetaDescription={`${t('siteDescription')} - ${homeT('pageMetaDescription')}`}
      pageImagePath={SITE_IMAGE}
    >
      <Hero />
      <HomeLastPosts lastPosts={lastPosts} />
    </PrimaryLayout>
  );
};

export default Home;

type Params = {
  locale: string;
};

export async function getStaticProps({ locale }: Params) {
  await generateRssFeed(locale);
  const lastPosts = getAllPostsByDateWithLocale(locale, POST_HEADER_FIELDS).slice(0, 3);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home', 'posts'])),
      lastPosts,
    },
  };
}
