import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { Context } from "../../store/store";
import { GlobalTypes } from "../../store/types";
import filterSearch from '../../utils/filterSearch';
const SearchBar = () => {
  const router = useRouter();
  const {state, dispatch} = useContext(Context);
  const {searchTerm} = state;
  const handleSearchTerm = (e) => {
    dispatch({type: GlobalTypes.SEARCH, payload: e.target.value})
  };
  const handleSearch = () => {
     filterSearch({router, search: searchTerm})
  }
 
  return (
    <div className="flex items-center justify-center min-w-full">
      <form
        className="w-full text-inherit flex items-center justify-between"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex min-h-[3rem] flex-1 bg-slate-300 dark:bg-zinc-700 items-center justify-between rounded-3xl h-10 pl-2">
          <div className="w-full flex justify-between items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-slate-300 dark:bg-zinc-700 w-full min-h-full focus:outline-none border-none"
              value={searchTerm}
              onChange={handleSearchTerm}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  filterSearch({router, search: searchTerm})
                }
              }}
            />
          </div>
          {searchTerm && (
            <Tooltip title="Clear search">
              <IconButton
                className="focus:outline-none text-zinc-600 dark:text-slate-200"
                onClick={() =>  dispatch({type: GlobalTypes.SEARCH, payload: ""})}
              >
                <AiOutlineClose className="mx-1 p-1" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Search">
            <IconButton onClick={handleSearch} className="text-zinc-600 dark:text-slate-200 focus:outline-none h-full px-2 rounded-r-3xl flex items-center justify-end">
              <AiOutlineSearch className="text-2xl" />
            </IconButton>
          </Tooltip>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
