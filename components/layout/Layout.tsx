import { FunctionComponent, ReactNode } from "react";

import Head from "next/head";

import { uppercaseFirst } from "core/textHelpers";

import { Footer, Navbar } from "..";

import {
  FAVICON_URL,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
} from "core/constants";

import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  siteImage?: string;
  metaDescription?: string;
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  title,
  siteImage,
  metaDescription,
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const twitterImageContentUrl = siteImage ? siteImage : SITE_IMAGE;
  const twitterImageContent = `${siteUrl}${twitterImageContentUrl}`;
  const pageTitle = title
    ? `${uppercaseFirst(title)} - ${SITE_NAME}`
    : SITE_NAME;
  const pageDescription = metaDescription
    ? metaDescription
    : `${SITE_NAME} - ${SITE_DESCRIPTION}`;
  const propertiesTitle = title ? uppercaseFirst(title) : SITE_NAME;
  const propertiesDescription = metaDescription
    ? metaDescription
    : SITE_DESCRIPTION;

  return (
    <div className={styles.container}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Google Properties */}
        <meta itemProp="name" content={propertiesTitle} />
        <meta itemProp="description" content={propertiesDescription} />
        <meta itemProp="image" content={siteImage ? siteImage : SITE_IMAGE} />

        {/* Open Graph Properties */}
        <meta property="og:url" content="https://www.devoreur2code.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={propertiesTitle} />
        <meta property="og:description" content={propertiesDescription} />
        <meta
          property="og:image"
          content={siteImage ? siteImage : SITE_IMAGE}
        />

        {/* Twitter Properties */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@devoreur2code" />
        <meta name="twitter:title" content={propertiesTitle} />
        <meta name="twitter:description" content={propertiesDescription} />
        <meta name="twitter:image" content={twitterImageContent} />

        <link rel="icon" href={FAVICON_URL} />
      </Head>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
