import React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = (props: any) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY as string;
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      defaultCenter={props.center}
      defaultZoom={props.zoom}
    >
      <span style={{color:'#000000'}}>MARKER!</span>
    </GoogleMapReact>
  );
};

export default GoogleMap;
