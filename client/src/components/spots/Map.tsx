import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = (props: any) => <div
    style={ { width: '50px', height: '20px', backgroundColor: 'red' } }>{ props.text }</div>;
const Map = (props: any) => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY || 'AIzaSyDlmZ0PvW0yBwB1b-cTX-fTjVfUQUUqWXY'
    return (
        <GoogleMapReact
            bootstrapURLKeys={ { key: apiKey } }
            defaultCenter={ props.center }
            defaultZoom={ props.zoom }
        >
            <AnyReactComponent
                { ...props.center }
                text="My Marker"
            />
        </GoogleMapReact>
    );
};

export default Map;
