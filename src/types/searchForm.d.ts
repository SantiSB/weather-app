export interface UseSearchForm {
    searchType: string;
    input: string;
    country: string;
    handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    setCountry: React.Dispatch<React.SetStateAction<string>>;
}