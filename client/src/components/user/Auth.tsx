import React from 'react';
import AuthRouter from './AuthRouter';
import styled from 'styled-components';

const imgUrl = '../../assets/images/background.png';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #red;
  background-image: url(${imgUrl});
  background-size: contain;
  background-repeat: no-repeat;
`;

const AuthWrapper = styled(AuthRouter)`
  margin: 0 auto;
  width: 100%;
  padding: 20px;

`;
const SideImage = styled.div`
  width: 100%;

  @media (max-width: 576px) {
    display: none;
  }
`;

const Auth = () => {
    return (
        <Wrapper>
            <AuthWrapper/>
        </Wrapper>
    );
};

export default Auth;
