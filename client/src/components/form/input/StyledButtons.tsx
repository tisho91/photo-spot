import styled from 'styled-components';


export const BaseButton = styled.button`
  background: #F86E51;
  border-radius: 8px;
  border: none;
  color: #ffffff;

  :hover {
    cursor: pointer;
  }
`;

export const SignOutButton = styled.span`
    font-family: 'Material Icons';
    font-size: 18px;
    color: #F86E51;
    :hover {
      cursor: pointer;
    }
`;

export const SubmitButton = styled(BaseButton)`
  height: 40px;
  font-size: 18px;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
`;
