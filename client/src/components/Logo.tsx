import React from 'react';
import styled from 'styled-components';

const Heading = styled.h2`
  font-family: 'Source Serif Pro';
  font-style: normal;
  font-weight: 900;
  color: #FFFFFF;
  font-size: 3.4rem;
  margin: 0;
`
const SubTitle = styled.sub`
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-size: 2.6rem;
  font-weight: 400;
  color: #F86E51;

`

const Logo = () => {
    return (
        <>
            <Heading>Photo-Spot</Heading>
            <SubTitle>Upload the memories.</SubTitle>
        </>
    );
};

export default Logo;
