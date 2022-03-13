import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
`

const StyledInput = styled.input`
  height: 40px;
  background: #FFFFFF;
  border-radius: 8px;
  outline: none;
  border: none;
  padding-left: 8px;
  font-size: 16px;

  :focus, :hover {
    background-color: #ffffff;
  }
`

const StyledLabel = styled.label`
  font-size: 18px;
  color: #fff;
  text-transform: capitalize;
`

const ErrorMessage = styled.span`
  color: #D1193E;
`


const TextInput = (props: any) => {
    const { register, setValue, errors } = props;
    return (
        <Wrapper className={ props.className }>
            <StyledLabel htmlFor={ props.id }>{ props.name }</StyledLabel>
            <StyledInput
                autoComplete="off"
                { ...register(props.id) }
                id={ props.id }
                type={ props.type }
            />
            {
                errors ? (
                    <ErrorMessage>{ errors.message }</ErrorMessage>
                ) : null
            }
        </Wrapper>
    );
};

export default TextInput;
