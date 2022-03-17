import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, getCurrentUserDataRequest, logout } from '../../state/userSlice';
import { Redirect, Route } from 'react-router-dom';
import Auth from '../../components/user/Auth';
import HomePage from '../../components/home/HomePage';
import { PrivateRoute } from '../PrivateRoute';
import { AppPaths } from '../constants/routes';
import Profile from '../../components/user/Profile';
import SpotList from '../../components/spots/SpotList';
import Spot from '../../components/spots/Spot';
import { getAllSpotsRequest } from '../../state/spotSlice';
import SpotCreator from '../../components/spots/SpotCreator';
import Header from '../../components/header/Header';
import styled from 'styled-components';

const AppRoutes = () => {
    const { token } = useSelector(authSelector);
    const dispatch = useDispatch();
    useEffect(() => {
    }, [ dispatch ])
    useEffect(() => {
        if (!!token) {
            dispatch(getCurrentUserDataRequest());
            dispatch(getAllSpotsRequest())
        } else {
            dispatch(logout())
        }
    }, [ token ])


    return (
        <>
            { !token ? null : <Header/> }
            <PrivateRoute path={ AppPaths.Home } component={ HomePage } exact/>
            <PrivateRoute path={ AppPaths.AddSpot } component={ SpotCreator } exact/>
            <PrivateRoute path={ AppPaths.SpotList } component={ SpotList } exact/>
            <PrivateRoute path={ AppPaths.SpotListItem } component={ Spot } exact/>
            <PrivateRoute path={ AppPaths.EditUser } component={ Profile } exact/>
            <Route path={ AppPaths.Auth } component={ Auth }/>
            {
                !!token ? <Redirect to={ AppPaths.Home }/> : null
            }
        </>
    );
};

export default AppRoutes;
