import React, { ChangeEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, userSelector } from '../../state/userSlice';
import styled from 'styled-components';
import { StyledChildComponent } from '../../common/types';
import SideMenu from '../home/SideMenu';
import { SignOutButton } from '../form/input/StyledButtons';
import { AppPaths } from '../../common/constants/routes';
import { Link } from 'react-router-dom';
import LogoHead from "../logo/LogoHead";
import SearchBar from "./SearchBar";

const HeaderWrapper = styled.header`
  height: 70px;
  background-color: #000;
  color: #fff;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 40px;
`;

const StyledLogoHead = styled(LogoHead)`
  font-size: 40px;
  margin-right: 20px;
`;


const StyledLink = styled(Link)`
  color: #F86E51;
  text-decoration: none;
  font-weight: 800;
  font-size: 32px;
  margin-left: auto;
  :hover {
    text-decoration: underline;
  }
`;

const StyledAvatar = styled.div<any>`
  width: 40px;
  height: 40px;
  background-size: contain;
  background-image: url(${(props) => props.img});
  border-radius: 100px;
  border: 1px solid #F86E51;
  margin: 0 15px;
`;

const Header = (props: StyledChildComponent) => {
    const { name, avatar } = useSelector(userSelector);
    const dispatch = useDispatch();

    const searchSpots = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        //    TODO Add search filter

    };
    return (
        <HeaderWrapper className={props.className}>
            <StyledLogoHead/>
            <SearchBar placeholder={'Search Location'} onChange={searchSpots}/>
            <StyledLink to={AppPaths.EditUser}>{name}</StyledLink>
            <StyledAvatar img={avatar}/>
            <SignOutButton
                onClick={() => {
                    dispatch(logout());
                }}
            >
                logout
            </SignOutButton>

        </HeaderWrapper>
    );
};

export default Header;
