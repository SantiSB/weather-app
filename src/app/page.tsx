"use client";
import styles from "./page.module.scss";
import SearchForm from "@/components/SearchForm";
import useSearchForm from "@/hooks/useSearchForm";

const Home: React.FC = () => {
  const searchProps = useSearchForm();

  return (
    <main className={styles.main}>
      <h1>Consulta el clima</h1>
      <SearchForm {...searchProps} />
    </main>
  );
};

export default Home;
