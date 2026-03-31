import Head from "next/head";
import styles from "../styles/index.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Labwork 10 - Pages Router</title>
      </Head>

      <h1>Default main page. Nothing here.</h1>
      <h6 className={styles.moduleH6}>colored text</h6>
    </div>
  );
}
