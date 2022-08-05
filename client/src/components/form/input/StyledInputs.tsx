import styled from 'styled-components';
import FormTextInput from './FormTextInput';

export const FormInput = styled(FormTextInput)`
  margin-bottom: 15px;
`;

export const StyledInput = styled.input`
  height: 40px;
  background: #393939;
  border-radius: 8px;
  outline: none;
  border: none;
  padding-left: 8px;
  font-size: 18px;
  color:#fff;
  &.withIcon{
    padding-left: 50px;
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
