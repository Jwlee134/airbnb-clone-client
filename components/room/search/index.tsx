import React from "react";
import styled, { css } from "styled-components";

import { useSelector } from "store";
import dynamic from "next/dynamic";
import Contents from "./contents";

const Map = dynamic(() => import("../../common/Map"), { ssr: false });

const Container = styled.div<{ showMap: boolean }>`
  display: flex;
  ${({ showMap }) =>
    showMap
      ? css`
          .search_contents {
            max-width: 840px;
            padding: ${({ theme }) => theme.padding.tablet};
          }
        `
      : css`
          .search_contents {
            max-width: ${({ theme }) => theme.maxWidth.normal};
            margin: 0 auto;
            min-height: calc(100vh - 80px);
          }
        `}
  @media ${({ theme }) => theme.device.tablet} {
    .search_contents {
      padding: ${({ theme }) => theme.padding.tablet};
    }
  }
`;

const SearchResults = () => {
  const showMap = useSelector((state) => state.map.showMap);
  const innerWidth = useSelector((state) => state.common.innerWidth);
  const searchResults = useSelector((state) => state.room.search.searchResults);

  return (
    <>
      <Container showMap={showMap}>
        {showMap && innerWidth < 1200 ? null : <Contents />}
        {showMap && <Map roomList={searchResults} useMoveToSearch />}
      </Container>
    </>
  );
};

export default SearchResults;
