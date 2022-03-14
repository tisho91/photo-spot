import React from 'react';
import { Link } from 'react-router-dom';
import { AppPaths } from '../../common/constants/routes';
import SpotList from '../spots/SpotList';
import Header from '../header/Header';
import SideMenu from './SideMenu';


const HomePage = () => {
    return (
        <div>
            <Header/>
            <Link to={ AppPaths.EditUser }>Edit Profile</Link>
            <SpotList/>
            <SideMenu/>
        </div>
    );
};

export default HomePage;
