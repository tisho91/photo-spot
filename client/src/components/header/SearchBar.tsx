import { StyledChildComponent } from "../../common/interfaces";
import React from "react";
import { StyledInput } from "../form/input/StyledInputs";
import styled from "styled-components";


const StyledSearch = styled.div`
  position: relative;
  .left-icon {
    font-family: 'Material Icons';
    position: absolute;
      top:0;
      margin-top: 2px;
      font-size: 35px;
      color: #F86E51;
   }
`;

const SearchBar = (props:any) => {
    return (
        <StyledSearch>
            <StyledInput {...props} onChange={props.onChange} className={'withIcon'}/>
            <div className={'left-icon'}>search</div>
        </StyledSearch>
    );
};

export default SearchBar;
