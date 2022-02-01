import React  from 'react';
import {  useSelector } from 'react-redux';
import { authSelector } from './state/authSlice';
import { Redirect, Route } from 'react-router-dom';
import Auth from './components/auth/Auth';
import HomePage from './components/home/HomePage';
import { PrivateRoute } from './PrivateRoute';
import DisplayName from './components/userProfile/DisplayName';
import Avatar from './components/userProfile/Avatar';
import { AUTH, HOME, UPDATE_AVATAR, UPDATE_DISPLAY_NAME } from './constants/routes';

const AppRoutes = () => {
    const { uid } = useSelector(authSelector);

    return (
        <div>
            <PrivateRoute path={ HOME } component={ HomePage } exact />
            <PrivateRoute path={ UPDATE_DISPLAY_NAME } component={ DisplayName } exact />
            <PrivateRoute path={ UPDATE_AVATAR } component={ Avatar } exact />
            <Route path={ AUTH } component={ Auth } />
            {
                !!uid? <Redirect to={ HOME }/> : null
            }
        </div>
    );
};

export default AppRoutes;
