import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, userSelector } from '../../state/userSlice';
import styled from 'styled-components';
import { BaseButton } from '../form/input/StyledButtons';
import { openSideMenu } from '../../state/appSlice';
import { StyledChildComponent } from '../../common/interfaces';
import SideMenu from '../home/SideMenu';


const HeaderWrapper = styled.header`
  height: 70px;
  background-color: #171717;
  color: #fff;
  display: flex;
  width: 100%;
  align-items: center;

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

const Header = (props: StyledChildComponent) => {
    const { id, name, avatar } = useSelector(userSelector);
    const dispatch = useDispatch();

    const triggerOpenSideMenu = () => {
        dispatch(openSideMenu())
    }
    return (
        <HeaderWrapper className={ props.className }>
            <MessageWrapper>{ name ? `Hello, ${ name }` : 'Welcome' }
            </MessageWrapper>
            <div>
                <span onClick={ triggerOpenSideMenu }>burger</span>
            </div>
            <SideMenu/>
        </HeaderWrapper>
    );
};

export default Header;
