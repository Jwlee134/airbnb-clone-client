import React from "react";
import Navigator from "./navigator";
import SearchBar from "./searchBar";

const MobileHeader = ({
  useSearchBar,
  scroll,
}: {
  useSearchBar: boolean;
  scroll: number;
}) => {
  return (
    <>
      {useSearchBar && <SearchBar scroll={scroll} />}
      <Navigator />
    </>
  );
};

export default MobileHeader;
