import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './Login';
import Register from './Register';
import { AppPaths } from '../../common/constants/routes';
import AuthNavigation from './AuthNavigation';
import Logo from '../Logo';
import styled from 'styled-components';

const StyledLogo = styled(Logo)`
  margin-bottom: 20px;
`

const AuthRouter: React.FC = (props: any) => {
    return (
        <div className={ props.className }>
            <StyledLogo/>
            <Switch>
                <Route path={ AppPaths.Login } component={ Login }/>
                <Route path={ AppPaths.Register } component={ Register }/>
            </Switch>
        </div>
    );
};

export default AuthRouter;
