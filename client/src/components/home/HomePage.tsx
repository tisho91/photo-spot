import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllSpotsRequest, spotsSelector } from '../../state/spotSlice';
import { EDIT_USER } from '../../constants/routes';
import { userSelector } from '../../state/authSlice';
import SpotList from '../spots/SpotList';


const HomePage = () => {
    const { avatar } = useSelector(userSelector)
    return (
        <div>
            <img style={ { width: '200px', height: '200px' } } src={ avatar }/>
            <Link to={ EDIT_USER }>Edit Profile</Link>
        <SpotList/>

        </div>
    );
};

export default HomePage;
