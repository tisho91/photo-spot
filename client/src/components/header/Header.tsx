import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, userSelector } from '../../state/userSlice';
import styled from 'styled-components';
import { BaseButton } from '../form/input/StyledButtons';
import { toggleSideMenu } from '../../state/appSlice';


const HeaderWrapper = styled.header`
  height: 70px;
  background-color: #171717;
  color: #fff;
  display: flex;
  width: 100%;
  align-items: baseline;

`
const MessageWrapper = styled.span`
  align-self: center;
  font-size: 18px;
  width: 100%;
`


const SignOutButton = styled(BaseButton)`
  height: 36px;
  width: 100px;
  margin-right: 10px;
  align-self: center;
  font-size: 16px;
`

const Header = () => {
    const { id, name, avatar } = useSelector(userSelector);
    const dispatch = useDispatch();
    const logoutUser = () => {
        dispatch(logout())
    }
    const openSideMenu = () => {
        dispatch(toggleSideMenu())
    }
    return (
        <HeaderWrapper>
            <MessageWrapper>{ name ? `Hello, ${ name }` : 'Welcome' }
            </MessageWrapper>
            <div>
                <span onClick={ openSideMenu }>burger</span>
            </div>
        </HeaderWrapper>
    );
};

export default Header;
