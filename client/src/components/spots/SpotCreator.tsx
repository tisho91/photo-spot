import React from "react";
import Form from "../form/Form";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { createNewSpotRequest } from "../../state/spotSlice";
import TextInput from "../form/input/TextInput";
import GoogleAutocomplete from "../form/input/GoogleAutocomplete";
import ImageInput from "../form/input/ImageInput";
import { createFileReader } from "../../common/utils";
import { FormProps, SpotData } from "../../common/types";
import { StyledForm } from "../form/StyledForm";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 50%;
  margin: 0 auto;
`;

const SpotCreator = () => {
  const dispatch = useDispatch();
  const formDefinition: FormProps = {
    validationSchema: yup.object({
      title: yup.string().required(),
      description: yup.string(),
      address: yup.string().required(),
      images: yup.mixed().test("images", "Must not be Empty", (files) => {
        return files.length;
      }),
    }),
    submitClickCallback: async (spot: SpotData) => {
      const images = spot.images;

      for (const image of images) {
        createFileReader(image);
      }
      dispatch(createNewSpotRequest({ ...spot, images }));
    },
    submitButtonText: "Submit",
  };

  return (
    <Wrapper>
      <StyledForm {...formDefinition}>
        <TextInput type="text" id="title" name="title" />
        <TextInput type="text" id="description" name="description" />
        <GoogleAutocomplete id="address" name="address" />
        <ImageInput id="images" name="images" multiple />
      </StyledForm>
    </Wrapper>
  );
};

export default SpotCreator;
