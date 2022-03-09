import React from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';


const GoogleAutocomplete = (props: any) => {
    const { setValue } = props;
    const { ref } = usePlacesWidget<HTMLInputElement>({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        options: {
            types: [ 'geocode', 'establishment' ],
        },
        onPlaceSelected: (place) => {
            console.log(place)
            const coordinates = {
                lat: place.geometry?.location?.lat(),
                lng: place.geometry?.location?.lng()
            }
            setValue(props.id, place.formatted_address);
            setValue('coordinates', coordinates);
        },
    });
    return (
        <>
            <input
                ref={ ref }
                autoComplete="off"
            />
        </>


    );
};

export default GoogleAutocomplete;
