import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, getCurrentUserDataRequest } from '../state/authSlice';
import { Redirect, Route } from 'react-router-dom';
import Auth from '../components/auth/Auth';
import HomePage from '../components/home/HomePage';
import { PrivateRoute } from '../PrivateRoute';
import { AUTH, EDIT_USER, HOME, SPOT_LIST, SPOT_LIST_ITEM } from '../constants/routes';
import User from '../components/auth/user/User';
import SpotList from '../components/spots/SpotList';
import Spot from '../components/spots/Spot';
import { getAllSpotsRequest } from '../state/spotSlice';

const AppRoutes = () => {
    const { token } = useSelector(authSelector);
    const dispatch = useDispatch();
    useEffect(() => {

    }, [ dispatch ])
    useEffect(() => {
        if (!!token) {
            dispatch(getCurrentUserDataRequest());
            dispatch(getAllSpotsRequest())
        }
    }, [ token, dispatch ])


    return (
        <div>
            <PrivateRoute path={ HOME } component={ HomePage } exact/>
            <PrivateRoute path={ SPOT_LIST } component={ SpotList } exact/>
            <PrivateRoute path={ SPOT_LIST_ITEM } component={ Spot } exact/>
            <PrivateRoute path={ EDIT_USER } component={ User } exact/>
            <Route path={ AUTH } component={ Auth }/>
            {
                !!token ? <Redirect to={ HOME }/> : null
            }
        </div>
    );
};

export default AppRoutes;
