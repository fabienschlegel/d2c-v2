import type { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation } from 'next-i18next';

import { Box, Heading, Text } from '@chakra-ui/react';

import { PrimaryLayout } from 'features/Layout';

import { SITE_IMAGE } from 'core/constants';

const About: NextPage = () => {
  const { t } = useTranslation('common');
  const { t: aboutT } = useTranslation('about');

  return (
    <PrimaryLayout
      pageTitle={aboutT('pageName')}
      pageMetaDescription={`${aboutT('pageName')} - ${t('siteDescription')}`}
      pageImagePath={SITE_IMAGE}
    >
      <Box width="100%" maxWidth={{ md: '660px', lg: '800px' }} padding={5} margin="0 auto 20px">
        <Heading>{aboutT('heading')}</Heading>
        <Text marginTop="1em">{aboutT('myNameIs')}</Text>
        <Text marginTop="1em">{aboutT('thankYou')}</Text>
        <Text marginTop="1em">{aboutT('shareIt')}</Text>
      </Box>
    </PrimaryLayout>
  );
};

type Params = {
  locale: string;
};

export async function getStaticProps({ locale }: Params) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'about'])),
    },
  };
}

export default About;
