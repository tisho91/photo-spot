import React from 'react';
import AuthRouter from './AuthRouter';
import styled from 'styled-components';

const imgUrl = '../../assets/images/background.png';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const AuthWrapper = styled(AuthRouter)`
  margin: 0 auto;
  width: 100%;
  padding: 20px;
`;

const Auth = () => {
    return (
        <Wrapper>
            <AuthWrapper/>
        </Wrapper>
    );
};

export default Auth;
