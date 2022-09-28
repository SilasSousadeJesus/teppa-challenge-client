import { useState } from "react";
import styles from "./search.module.scss";

interface SearchProps {
  onSearch(query: string): Promise<void>;
  onClear(): Promise<void>
  placeholder: string;
  onSubmit?: (event: any) => void
}

const Search: React.FC<SearchProps> = (props) => {
  const [query, setQuery] = useState<string>("");

  const SearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onSubmit && props.onSubmit(event)
}

  return (
    <>
      <div className={styles.seachContainer} data-aos="fade-right">
        <form
          action="#"
          onChange={() => props.onSearch(query)} 
          className={styles.AppInput}
          onSubmit={SearchSubmit}
        >
          <input
            type="text"
            placeholder={props.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.inputSearch}
          />
        </form>
        <button className={styles.clearBtn}  onClick={props.onClear}> Limpar busca</button>
      </div>
    </>
  );
};

export default Search;
