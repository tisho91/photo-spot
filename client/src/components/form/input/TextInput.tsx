import React from 'react';
import styled from 'styled-components';
import { ErrorMessage, StyledInput, StyledLabel } from './StyledInputs';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

const TextInput = (props: any) => {
  const { register, errors } = props;
  return (
    <Wrapper className={props.className}>
      <StyledLabel htmlFor={props.id}>{props.name}</StyledLabel>
      <StyledInput
        autoComplete="off"
        {...register(props.id)}
        id={props.id}
        type={props.type}
      />
      {errors ? <ErrorMessage>{errors.message}</ErrorMessage> : null}
    </Wrapper>
  );
};

export default TextInput;
