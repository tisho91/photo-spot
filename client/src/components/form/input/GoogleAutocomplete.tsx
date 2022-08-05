import React from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import { StyledInput, StyledLabel } from './StyledInputs';
import GoogleMap from "../../spots/GoogleMap";

const GoogleAutocomplete = (props: any) => {
  const { setValue } = props;
  const { ref } = usePlacesWidget<HTMLInputElement>({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    options: {
      types: ['geocode', 'establishment'],
    },
    onPlaceSelected: (place) => {
      const coordinates = {
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      };
      setValue(props.id, place.formatted_address);
      setValue('coordinates', coordinates);
    },
  });
  return (
    <>
      <StyledLabel htmlFor={props.id}>{props.name}</StyledLabel>
      <StyledInput ref={ref} autoComplete="off" />
      <GoogleMap />
    </>
  );
};

export default GoogleAutocomplete;
