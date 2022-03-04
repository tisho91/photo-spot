import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, getCurrentUserDataRequest, logout } from '../state/authSlice';
import { Redirect, Route } from 'react-router-dom';
import Auth from '../components/auth/Auth';
import HomePage from '../components/home/HomePage';
import { PrivateRoute } from '../PrivateRoute';
import { ADD_SPOT, AUTH, EDIT_USER, HOME, SPOT_LIST, SPOT_LIST_ITEM } from '../constants/routes';
import User from '../components/auth/user/User';
import SpotList from '../components/spots/SpotList';
import Spot from '../components/spots/Spot';
import { getAllSpotsRequest } from '../state/spotSlice';
import SpotCreator from '../components/spots/SpotCreator';
import SignInSide from '../sample';

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
            <PrivateRoute path={ HOME } component={ HomePage } exact/>
            <PrivateRoute path={ ADD_SPOT } component={ SpotCreator } exact/>
            <PrivateRoute path={ SPOT_LIST } component={ SpotList } exact/>
            <PrivateRoute path={ SPOT_LIST_ITEM } component={ Spot } exact/>
            <PrivateRoute path={ EDIT_USER } component={ User } exact/>
            <Route path="/test" component={ SignInSide } exact/>
            <Route path={ AUTH } component={ Auth }/>
            {
                !!token ? <Redirect to={ HOME }/> : null
            }
        </>
    );
};

export default AppRoutes;
