import { Outlet, useSearchParams } from "react-router";
import Banner from "../components/Banner";
import { createContext } from "react";

export const SearchContext = createContext({});

export default function ResultsLayout() {
  const [ searchParams, setSearchParams ] = useSearchParams();

  return (
    <>
    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
      <div className="main">
        <Banner />
        <Outlet />
      </div>
    </SearchContext.Provider>
    </>
  );
}
