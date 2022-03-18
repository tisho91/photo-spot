import React from 'react';
import styled from 'styled-components';
import { StyledChildComponent } from '../common/interfaces';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
`

const Heading = styled.h2`
  font-family: 'Source Serif Pro';
  font-style: normal;
  font-weight: 900; 
  color: #FFFFFF;
  font-size: 26px;
  margin: 0;
`
const SubTitle = styled.sub`
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-size: 16px;
  font-weight: 400;
  color: #F86E51;
`


const Logo = (props: StyledChildComponent) => {
  return (
    <Wrapper className={ props.className }>
      <Heading>Photo-Spot</Heading>
      <SubTitle>Upload the memories.</SubTitle>
    </Wrapper>
  );
};

export default Logo;
