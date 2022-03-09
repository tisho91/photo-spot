import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './login/Login';
import Register from './register/Register';
import { LOGIN, REGISTER } from '../../constants/routes';
import AuthNavigation from './AuthNavigation';


const AuthRouter: React.FC = () => {
    return (
        <>
            <div>
                <h2>Photo Spot</h2>
                <span> Upload the memories</span>
            </div>
            <Switch>
                <Route path={ LOGIN } component={ Login }></Route>
                <Route path={ REGISTER } component={ Register }></Route>
            </Switch>
            <AuthNavigation/>
        </>
    );
};

export default AuthRouter;
