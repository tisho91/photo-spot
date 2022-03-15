import React from 'react';
import { Link } from 'react-router-dom';
import { AppPaths } from '../../common/constants/routes';
import SpotList from '../spots/SpotList';



const HomePage = () => {
    return (
        <div>
            <Link to={ AppPaths.EditUser }>Edit Profile</Link>
            <SpotList/>
        </div>
    );
};

export default HomePage;
