import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, closeSideMenu } from '../../state/appSlice';
import { useOutsideClick } from '../../common/hooks';
import { logout } from '../../state/userSlice';


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
    const ref = useRef(null);
    useOutsideClick(ref, () => {
        dispatch(closeSideMenu())
    });
    return (
        <StyledMenu ref={ ref } open={ isSideMenuOpen }>
            <span>
                <button onClick={ () => {
                    dispatch(logout())
                } }>logout</button>
            </span>
        </StyledMenu>
    );
};

export default SideMenu;
