import React from 'react';
import { Link } from 'react-router-dom';
import { AppPaths } from '../../common/constants/routes';
import styled from 'styled-components';
import { StyledChildComponent } from '../../common/interfaces';

const StyledText = styled.span`
  font-size: 18px;
  color: #ffffff;
`
const StyledLink = styled(Link)`
  color: #F86E51;
`

interface AuthNavigation extends StyledChildComponent {
    route: AppPaths
    linkText: string;
    helperText: string;
}

const AuthNavigation = (props: AuthNavigation) => {
    return (
        <StyledText>{ props.helperText } <StyledLink to={ props.route }>{ props.linkText }</StyledLink></StyledText>
    );
};

export default AuthNavigation;
