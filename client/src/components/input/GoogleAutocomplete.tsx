import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { usePlacesWidget } from 'react-google-autocomplete';


const GoogleAutocomplete = (props: any) => {
    const { setValue } = props;
    const { ref } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        options: {
            types: ["geocode", "establishment"],
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
        <FormControl>
            <TextField
                inputRef={ ref }
                inputProps={ { autoComplete: 'off' } }
            />
        </FormControl>
    );
};

export default GoogleAutocomplete;
