import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, getCurrentUserDataRequest } from '../state/authSlice';
import { Redirect, Route } from 'react-router-dom';
import Auth from '../components/Auth/Auth';
import HomePage from '../components/home/HomePage';
import { PrivateRoute } from '../PrivateRoute';
import { AUTH, EDIT_USER, HOME } from '../constants/routes';
import User from '../components/Auth/user/User';

const AppRoutes = () => {
    const dispatch = useDispatch()
    const { token } = useSelector(authSelector);
    useEffect(() => {
        if (!!token) {
            dispatch(getCurrentUserDataRequest())
        }
    }, [ token ])


    return (
        <div>
            <PrivateRoute path={ HOME } component={ HomePage } exact/>
            <PrivateRoute path={ EDIT_USER } component={ User } exact/>
            <Route path={ AUTH } component={ Auth }/>
            {
                !!token ? <Redirect to={ HOME }/> : null
            }
        </div>
    );
};

export default AppRoutes;
