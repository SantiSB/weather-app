"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UseSearchForm } from "@/types/searchForm";

const useSearchForm = (): UseSearchForm => {
  const [searchType, setSearchType] = useState<string>("city");
  const [input, setInput] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const router = useRouter();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
    setInput("");
    setCountry("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const path =
      searchType === "city"
        ? `/forecast?city=${input}`
        : `/forecast?zip=${input}&country=${country}`;
    router.push(path);
  };

  return {
    searchType,
    input,
    country,
    handleSelect,
    handleSubmit,
    setInput,
    setCountry,
  };
};

export default useSearchForm;
