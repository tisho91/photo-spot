import React from "react";
import { Link } from "react-router-dom";
import { SpotData, StyledChildComponent } from "../../common/types";
import styled from "styled-components";

type Image = {
  url: string;
};

type StyledSpotListItem = StyledChildComponent &
  SpotData & {
    images: Image[];
    id: string;
  };

const StyledSpotListItem = styled.div<any>`
  //background-color: red;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  display: block;
  width: 100%;
  height: 100%;
  background-position: center;

  > span {
    font-size: 12px;
    text-decoration: none;
    color: #ffffff;
    &:hover {
      font-size: 16px;
    }
  }
`;

const SpotListItem = (props: StyledSpotListItem) => {
  const imgUrl =
    props.images[0]?.url ||
    "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png";
  return (
    <Link className={props.className} to={`/spots/${props.id}`}>
      <StyledSpotListItem img={imgUrl}>
        <span>{props.title}</span>
      </StyledSpotListItem>
      {/*<h1 style={{ fontSize: "16px" }}>{props.title}</h1>*/}
    </Link>
  );
};

export default SpotListItem;
