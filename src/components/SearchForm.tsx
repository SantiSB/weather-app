'use client'
import React from "react";
import styles from "./SearchForm.module.scss";

interface SearchFormProps {
  searchType: string;
  input: string;
  country: string;
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchType,
  input,
  country,
  handleSelect,
  handleSubmit,
  setInput,
  setCountry,
}) => {
  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <select
        className={styles.formControl}
        value={searchType}
        onChange={handleSelect}
      >
        <option value="city">Ciudad</option>
        <option value="zip">Código Postal</option>
      </select>
      <input
        type="text"
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
  );
};

export default SearchForm;
