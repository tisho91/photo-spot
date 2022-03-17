import styled from "styled-components";
import TextInput from "./TextInput";

export const FormInput = styled(TextInput)`
  margin-bottom: 15px;
`;

export const StyledInput = styled.input`
  height: 40px;
  background: #ffffff;
  border-radius: 8px;
  outline: none;
  border: none;
  padding-left: 8px;
  font-size: 16px;

  :focus,
  :hover {
    background-color: #ffffff;
  }
`;

export const StyledLabel = styled.label`
  font-size: 18px;
  color: #fff;
  text-transform: capitalize;
`;

export const ErrorMessage = styled.span`
  color: #d1193e;
`;
