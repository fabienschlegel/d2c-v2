import { FunctionComponent, ReactNode } from "react";

import Head from "next/head";

import { uppercaseFirst } from "../../core/textHelpers";

import { Footer, Navbar } from "..";

import { FAVICON_URL } from "../../core/constants";

import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  metaDescription?: string;
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  title,
  metaDescription,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          {title
            ? `${uppercaseFirst(title)} - Dévoreur 2 Code`
            : "Dévoreur 2 Code"}
        </title>
        <meta
          name="description"
          content={
            metaDescription
              ? metaDescription
              : "Dévoreur 2 Code - another blog from a developer"
          }
        />
        <link rel="icon" href={FAVICON_URL} />
      </Head>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
