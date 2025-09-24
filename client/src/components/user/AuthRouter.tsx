import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './Login';
import Register from './Register';
import { AppPaths } from '../../common/constants/routes';
import Logo from '../logo/Logo';
import styled from 'styled-components';
import { StyledChildComponent } from '../../common/types';

const Wrapper = styled.div`
  width: 75%; 
  margin: 50px auto 0;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const StyledLogo = styled(Logo)`
  margin-bottom: 20px;
`;

const AuthRouter: React.FC<StyledChildComponent> = (
  props: StyledChildComponent
) => {
  return (
    <div className={props.className}>
      <Wrapper>
        <StyledLogo />
        <Switch>
          <Route path={AppPaths.Login} component={Login} />
          <Route path={AppPaths.Register} component={Register} />
        </Switch>
      </Wrapper>
    </div>
  );
};

export default AuthRouter;
