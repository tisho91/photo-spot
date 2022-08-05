import { StyledChildComponent } from "../../common/interfaces";
import styled from "styled-components";

const Wrapper = styled.div`
    color: #fff;
    font-family: 'Open Sans';
    font-weight: 800;
    font-style: normal;
    pointer-events: none;
    user-select: none;
`;
const Photo = styled.span`
  color: #F86E51;
`;

const LogoHead = (props: StyledChildComponent) => {
    return (
        <Wrapper className={props.className}>
            <Photo>Photo</Photo><span>Spot</span>
        </Wrapper>
    );
};

export default LogoHead;
