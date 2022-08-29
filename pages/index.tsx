import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dévoreur 2 Code</title>
        <meta
          name="description"
          content="Dévoreur 2 Code - another blog from a developer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Under Construction</h1>
      </main>
    </div>
  );
};

export default Home;
