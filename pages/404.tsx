import type { NextPage } from 'next';

import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Flex, Heading } from '@chakra-ui/react';

import { PrimaryLayout } from 'features/Layout';

import { ButtonLink } from 'features/Posts/components';

import { SITE_IMAGE } from 'core/constants';

const FourZeroFour: NextPage = () => {
  const { t } = useTranslation('common');
  return (
    <PrimaryLayout
      pageTitle={t('404pageTitle')}
      pageMetaDescription={`${t('siteDescription')} - ${t('404pageMetaDescription')}`}
      pageImagePath={SITE_IMAGE}
    >
      <Flex
        width="100%"
        flex={1}
        align="center"
        justify="center"
        backgroundColor="brand.darkBlue"
        direction="column"
      >
        <Heading mb={8} size={{ base: '2xl', lg: '3xl' }} color="white">
          404
        </Heading>
        <Heading mb={8} size={{ base: '2xl', lg: '3xl' }} color="brand.green">
          {t('youReLost')}
        </Heading>
        <ButtonLink href="/" label={t('toHome')} />
      </Flex>
    </PrimaryLayout>
  );
};

export default FourZeroFour;

type Params = {
  locale: string;
};

export async function getStaticProps({ locale }: Params) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home', 'posts'])),
    },
  };
}
