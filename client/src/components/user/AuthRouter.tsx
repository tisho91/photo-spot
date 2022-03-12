import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './Login';
import Register from './Register';
import { LOGIN, REGISTER } from '../../common/constants/routes';
import AuthNavigation from './AuthNavigation';
import Logo from '../Logo';
import styled, { createGlobalStyle } from 'styled-components';

const StyledLogo = styled(Logo)`
  
`

const AuthRouter: React.FC = (props: any) => {
    return (
        <div className={ props.className }>
            <StyledLogo/>
            <Switch>
                <Route path={ LOGIN } component={ Login }></Route>
                <Route path={ REGISTER } component={ Register }></Route>
            </Switch>
            <AuthNavigation/>
        </div>
    );
};

export default AuthRouter;
