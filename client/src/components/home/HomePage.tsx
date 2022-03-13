import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppPaths } from '../../common/constants/routes';
import { userSelector } from '../../state/userSlice';
import SpotList from '../spots/SpotList';
import Header from '../header/Header';



const HomePage = () => {
    const { avatar } = useSelector(userSelector)
    return (
        <div>
            <Header/>
            <img style={ { width: '200px', height: '200px' } } src={ avatar }/>
            <Link to={ AppPaths.EditUser }>Edit Profile</Link>
            <SpotList/>

        </div>
    );
};

export default HomePage;
