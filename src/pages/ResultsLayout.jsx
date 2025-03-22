import { Outlet, useSearchParams } from "react-router";
import Banner from "../components/Banner";

import { SearchContext } from "../contexts/SearchContext";

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
