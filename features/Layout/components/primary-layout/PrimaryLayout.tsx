import { useMetaProperties } from 'features/Layout/hooks';
import { FunctionComponent, ReactNode } from 'react';

import { Footer, Layout, Navbar } from '..';

import { FAVICON_URL } from 'core/constants';

interface PrimaryLayoutProps {
  children: ReactNode;
  pageTitle: string;
  pageMetaDescription: string;
  pageImagePath: string;
}

const PrimaryLayout: FunctionComponent<PrimaryLayoutProps> = ({
  children,
  pageTitle,
  pageMetaDescription,
  pageImagePath,
}) => {
  const { title, metaDescription, imageSrc, siteUrl } = useMetaProperties({
    pageTitle,
    pageMetaDescription,
    pageImagePath,
  });

  return (
    <Layout>
      <Layout.Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href={FAVICON_URL} />

        {/* Google MetaProperties */}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={metaDescription} />
        <meta itemProp="image" content={imageSrc} />

        {/* Open Graph Meta Properties */}
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={imageSrc} />

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
