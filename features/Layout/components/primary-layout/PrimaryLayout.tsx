import { FunctionComponent, ReactNode } from 'react';

import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';

import { useMetaProperties } from 'features/Layout/hooks';

import { Footer, Layout, Navbar } from '..';

import { DEFAULT_LOCALE, FAVICON_URL } from 'core/constants';

import { Alternates } from 'features/Posts/types';

interface PrimaryLayoutProps {
  children: ReactNode;
  pageTitle: string;
  pageMetaDescription: string;
  pageImagePath: string;
  alternates?: Alternates;
}

const PrimaryLayout: FunctionComponent<PrimaryLayoutProps> = ({
  children,
  pageTitle,
  pageMetaDescription,
  pageImagePath,
  alternates = [],
}) => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { language } = i18n;
  const { title, metaDescription, imageSrc, siteUrl } = useMetaProperties({
    pageTitle,
    pageMetaDescription,
    pageImagePath,
  });

  const currentLocaleForPath = language === DEFAULT_LOCALE ? '' : `/${language}`;

  return (
    <Layout>
      <Layout.Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href={FAVICON_URL} />

        {alternates.map((a) => {
          const alternateLocale = a.locale === DEFAULT_LOCALE ? '' : `/${a.locale}`;

          return (
            <link
              key={a.locale}
              rel="alternate"
              hrefLang={a.locale}
              href={`${siteUrl}${alternateLocale}/blog/${a.slug}`}
            />
          );
        })}

        <link rel="canonical" href={`${siteUrl}${currentLocaleForPath}${router.asPath}`} />

        {/* Google MetaProperties */}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={metaDescription} />
        <meta itemProp="image" content={imageSrc} />

        {/* Open Graph Meta Properties */}
        <meta property="og:url" content={`${siteUrl}${currentLocaleForPath}${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={imageSrc} />
        <meta property="og:locale" content={language} />

        {/* Twitter Summary Card */}

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@devoreur2code" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={imageSrc} />
      </Layout.Head>
      <Navbar />
      <Layout.Main>{children}</Layout.Main>
      <Footer />
    </Layout>
  );
};

export default PrimaryLayout;
