import { IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

export default function SearchBar({ items, keys, searchHandler }) {
  const [query, setQuery] = useState();
  const [results, setResults] = useState([]);
  const fuse = new Fuse(items, {
    keys,
  });

  useEffect(() => {
    if (!query || !items) {
      setResults([]);
      return;
    }
    const results = fuse.search(query);
    setResults(results);
  }, [query]);

  const handleItemSelect = (orderId) => {
    searchHandler(orderId);
    setQuery("");
  };

  return (
    <div className="flex flex-col relative">
      <div
        className={`rounded-xl flex items-center shadow-lg  border-2 bg-white px-2 gap-2 align-baseline py-1 ${
          results?.length > 0 && "rounded-b-none"
        }`}
      >
        <IconButton sx={{ mx: 1 }}>
          <Search sx={{ color: "#a9a9a9" }} />
        </IconButton>
        <input
          type="search"
          placeholder="Search by product name"
          className="w-full rounded-xl leading-[24px] outline-none font-poppins"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      {results?.length > 0 && (
        <div className="flex flex-col w-full bg-white rounded-xl rounded-t-none border-t-0  py-1 border-2 absolute top-[100%]">
          {results.map(({ item }, index) => {
            return (
              <>
                {index > 0 && <hr />}
                <SearchItem
                  productName={item.product.name}
                  key={item.id}
                  id={item.id}
                  clickHandler={handleItemSelect}
                />
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}

const SearchItem = ({ productName, clickHandler, id }) => {
  return (
    <div
      className="bg-white w-full p-2 text-black text-md cursor-pointer font-poppins"
      onClick={() => clickHandler(id)}
    >
      {productName}
    </div>
  );
};
