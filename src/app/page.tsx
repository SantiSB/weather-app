"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

const Home: React.FC = () => {
  const [searchType, setSearchType] = useState("city");
  const [input, setInput] = useState("");
  const [country, setCountry] = useState("ES");
  const router = useRouter();

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
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="city">Ciudad</option>
          <option value="zip">Código Postal</option>
        </select>
        <input
          type="text"
          id="searchInput"
          name="searchInput"
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
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Código de país (Ej: ES)"
            required
          />
        )}
        <button type="submit">Buscar</button>
      </form>
    </main>
  );
};

export default Home;
