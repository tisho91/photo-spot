import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { spotsSelector } from '../../state/spotSlice';
import { appSelector, toggleSideMenu } from '../../state/appSlice';


const StyledMenu = styled.nav<any>`
 
  height: 100%;
  width: 33%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 100%;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;
  transform: ${ ({ open }) => open ? 'translateX(-100%)' : 'translateX(0)' };
  transition: transform 0.3s ease-in-out;


  @media (max-width: 576px) {
    width: 100%;
  }
  
`


const SideMenu = () => {
    const { isSideMenuOpen } = useSelector(appSelector)
    const dispatch = useDispatch();
    return (
        <StyledMenu open={ isSideMenuOpen }>
            <span>
                <button onClick={ () => {
                    dispatch(toggleSideMenu())
                } }>close</button>
            </span>
        </StyledMenu>
    );
};

export default SideMenu;
