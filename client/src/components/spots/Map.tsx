import React from 'react';
import GoogleMapReact from 'google-map-react';

const Map = (props: any) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY as string;
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      defaultCenter={props.center}
      defaultZoom={props.zoom}
    >
      {/*    Markers*/}
    </GoogleMapReact>
  );
};

export default Map;
