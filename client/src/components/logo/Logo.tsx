import React from 'react';
import styled from 'styled-components';
import { StyledChildComponent } from '../../common/interfaces';
import LogoHead from "./LogoHead";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

const Heading = styled(LogoHead)`
    font-size: 100px;
    text-align: center;
    margin: 0;
`;
const SubTitle = styled.sub`
    font-family: 'Cooper Hewitt';
    font-style: normal;
    font-weight: 700;
    font-size: 29px;
    color: #F86E51;
    text-transform: uppercase;
    text-align: center;
`;


const Logo = (props: StyledChildComponent) => {
    return (
        <Wrapper className={props.className}>
            <Heading/>
            <SubTitle>Upload the memories.</SubTitle>
        </Wrapper>
    );
};

export default Logo;
