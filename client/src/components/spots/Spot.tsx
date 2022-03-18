import React from 'react';
import { useSelector } from 'react-redux';
import { findSpotByIdSelector } from '../../state/spotSlice';
import { useParams } from 'react-router';
import styled from 'styled-components';
import GoogleMap from './GoogleMap';

const StyledWrapper = styled.div`
  color: #fff;
`;
const StyledGallery = styled.div<any>`
  display: flex;
  flex-wrap: wrap;
`;
const StyledImage = styled.img<any>`
  //display: ;
  max-width: 400px;
  height: 250px;
  margin: 5px;
  //border: 1px solid red;
`;

const MapWrapper = styled.div`
  width: 300px;
  height: 200px;
`;

const Spot = () => {
  const { id } = useParams<{ id: string }>();
  const spot = useSelector(findSpotByIdSelector(id));
  return (
    <StyledWrapper>
      {spot ? (
        <StyledGallery>
          {spot.images.map((image: any, index: number) => {
            return <StyledImage key={index} src={image.url} />;
          })}
          <MapWrapper>
            <GoogleMap center={spot.coordinates} zoom={16} />
          </MapWrapper>
        </StyledGallery>
      ) : null}
    </StyledWrapper>
  );
};

export default Spot;
