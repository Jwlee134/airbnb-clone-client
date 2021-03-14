import Checkbox from "components/common/Checkbox";
import { roomTypeRadioOptions } from "lib/staticData";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styled, { css } from "styled-components";
import querystring from "querystring";
import { useDispatch } from "react-redux";
import { roomActions } from "store/room";
import { useSelector } from "store";
import Footer from "./Footer";
import { extractCustomQuery } from "utils";

interface Props {
  opened: boolean;
  query: string | string[] | undefined;
}

const Container = styled.div`
  margin-right: 10px;
  position: relative;
`;

const Title = styled.div<Props>`
  ${({ opened, query }) =>
    opened || query
      ? css`
          box-shadow: 0 0 0 1px black;
        `
      : css`
          box-shadow: none;
        `}
`;

const CheckBoxContainer = styled.div`
  padding: 20px 20px 0px;
`;

const RoomType = () => {
  const search = useSelector((state) => state.search);
  const [opened, setOpened] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();

  const handleChange = (value: string[]) => setOptions(value);

  const handleSave = () => {
    dispatch(roomActions.setIsLoading(true));
    router.push(
      `/search/rooms?${querystring.stringify(search)}&${querystring.stringify(
        extractCustomQuery({
          ...query,
          page: "1",
          roomType: options,
        })
      )}`
    );
    setOpened(false);
  };

  // roomType이 하나면 스트링, 두개 이상이면 배열임
  useEffect(() => {
    if (query.roomType) {
      if (query.roomType.length > 3) {
        setOptions([query.roomType as string]);
        return;
      }
      setOptions(query.roomType as string[]);
    }
  }, []);

  const handleDelete = () => setOptions([]);

  const getText = () => {
    if (query.roomType) {
      if (query.roomType.length > 3) {
        switch (query.roomType) {
          case "entire":
            return "집 전체";
          case "private":
            return "개인실";
          case "public":
            return "다인실";
          default:
            return "숙소 유형";
        }
      }
      return "숙소 유형";
    }
    return "숙소 유형";
  };

  return (
    <Container>
      <OutsideClickHandler onOutsideClick={() => setOpened(false)}>
        <Title
          opened={opened}
          className="filter-title"
          onClick={() => setOpened(!opened)}
          query={query.roomType}
        >
          {getText()}
        </Title>
        {opened && (
          <ul className="filter-popup">
            <CheckBoxContainer>
              <Checkbox
                options={roomTypeRadioOptions}
                items={options}
                onChange={handleChange}
              />
            </CheckBoxContainer>
            <Footer handleDelete={handleDelete} handleSave={handleSave} />
          </ul>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default RoomType;
