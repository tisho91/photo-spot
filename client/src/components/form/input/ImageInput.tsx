import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledImageInput = styled.div`
  display: flex;

  input {
    display: none;
  }

  label,
  img {
    color: #ffffff;
    background-color: #d0d0d0;
    width: 100px;
    height: 100px; 
    display: block;
    border-radius: 10px;
    border: 1px solid #fff;
    margin: 10px;
  }
`;

const ImageInput = (props: any) => {
  const { register } = props;
  const [images] = useState();
  const initialState = props.previewUrls || [];
  const [previewUrls, setPreviewUrls] = useState<any>(initialState);
  console.log(initialState);

  const addPreviewUrl = (url: any) => {
    setPreviewUrls((previewUrls: any[]) => {
      return props.multiple ? [...previewUrls, url] : [url];
    });
  };
  useEffect(() => {
    if (!images) {
      return;
    }
    console.log(images);
  }, [images]);
  const handleChange = (e: any) => {
    const images = e.target.files;
    Array.from(images).forEach((image: any) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        addPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(image);
    });
  };
  // TODO fix for single and multiple !
  return (
    <StyledImageInput className={props.className}>
      <input
        accept="image/*"
        type="file"
        id={props.id}
        {...register(props.id, {
          onChange: (e: any) => {
            handleChange(e);
          },
        })}
        multiple={props.multiple}
        value={images}
      />
      <label htmlFor={props.id}>+</label>
      {previewUrls
        ? previewUrls.map((url: string, index: number) => (
          <img key={index} src={url} />
        ))
        : null}
    </StyledImageInput>
  );
};

export default ImageInput;
