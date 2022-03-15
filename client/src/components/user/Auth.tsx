import React from 'react';
import AuthRouter from './AuthRouter';
import styled from 'styled-components';
import Header from '../header/Header';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #171717;
`

const AuthWrapper = styled(AuthRouter)`
  margin: 0 auto;
  width: 100%;
  padding: 20px;
`
const imgUrl = '../../assets/images/splash-image-auth.png'
const SideImage = styled.div`
  background-image: url(${ imgUrl });
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
`


const Auth = () => {
    return (
        <>
            <Wrapper>
                <AuthWrapper/>
                <SideImage/>
            </Wrapper>
        </>

    );
};

export default Auth;
