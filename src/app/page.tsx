"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

const Home: React.FC = () => {
  const [searchType, setSearchType] = useState("city");
  const [input, setInput] = useState("");
  const [country, setCountry] = useState("");
  const router = useRouter();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
    setInput("");
    setCountry("");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchType === "city") {
      router.push(`/forecast?city=${input}`);
    } else {
      router.push(`/forecast?zip=${input}&country=${country}`);
    }
  };

  return (
    <main className={styles.main}>
      <h1>Consulta el clima</h1>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <select
          className={styles.formControl}
          value={searchType}
          onChange={(e) => handleSelect(e)}
        >
          <option value="city">Ciudad</option>
          <option value="zip">Código Postal</option>
        </select>
        <input
          type="text"
          id="searchInput"
          name="searchInput"
          className={styles.formControl}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            searchType === "city"
              ? "Ingresa una ciudad"
              : "Ingresa un código postal"
          }
          required
        />
        {searchType === "zip" && (
          <input
            type="text"
            id="country"
            name="country"
            className={styles.formControl}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Código de país (Ej: ES)"
            required
          />
        )}
        <button type="submit" className={styles.formButton}>
          Buscar
        </button>
      </form>
    </main>
  );
};

export default Home;
