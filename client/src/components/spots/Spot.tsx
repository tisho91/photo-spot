import React from 'react';
import { useSelector } from 'react-redux';
import { findSpotByIdSelector } from '../../state/spotSlice';
import { useParams } from 'react-router';
import Map from './Map';

const Spot = () => {
  const { id } = useParams<{ id: string }>();
  const spot = useSelector(findSpotByIdSelector(id));
  return (
    <div>
      {spot ? (
        <div style={{ width: '100%', height: '300px' }}>
          {spot.id}
          <Map center={spot.coordinates} zoom={16} />
        </div>
      ) : null}
    </div>
  );
};

export default Spot;
