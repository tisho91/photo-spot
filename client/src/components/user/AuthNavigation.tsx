import React from 'react';
import { Link } from 'react-router-dom';
import { AppPaths } from '../../common/constants/routes';
import styled from 'styled-components';
import { StyledChildComponent } from '../../common/types';

const StyledText = styled.span`
font-size: 24px;
  color: #ffffff;
`;
const StyledLink = styled(Link)`
  color: #f86e51; 
`;

type AuthNavigationProps = StyledChildComponent & {
  route: AppPaths;
  linkText: string;
  helperText: string;
};

const AuthNavigation: React.FC<AuthNavigationProps> = (
  props: AuthNavigationProps
) => {
  return (
    <StyledText>
      {props.helperText}{' '}
      <StyledLink to={props.route}>{props.linkText}</StyledLink>
    </StyledText>
  );
};

export default AuthNavigation;
