import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, userSelector } from '../../state/userSlice';
import styled from 'styled-components';
import { StyledChildComponent } from '../../common/interfaces';
import SideMenu from '../home/SideMenu';
import { SignOutButton } from '../form/input/StyledButtons';
import { AppPaths } from '../../common/constants/routes';
import { Link } from 'react-router-dom';


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

const StyledLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

const Header = (props: StyledChildComponent) => {
    const { name } = useSelector(userSelector);
    const dispatch = useDispatch();
    return (
        <HeaderWrapper className={ props.className }>
            <MessageWrapper>
                Hello,&nbsp;
                <StyledLink to={ AppPaths.EditUser }>
                    { name }
                </StyledLink>
            </MessageWrapper>
            <SignOutButton onClick={ () => {
                dispatch(logout())
            } }>Sign Out</SignOutButton>
            <SideMenu/>
        </HeaderWrapper>
    );
};

export default Header;
