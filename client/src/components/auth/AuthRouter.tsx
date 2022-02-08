import React from 'react';
import { Route, Switch } from 'react-router';
import Login from "./login/Login";
import Register from "./register/Register";
import { LOGIN, REGISTER } from '../../constants/routes';


const AuthRouter: React.FC = () => {
    return (
        <Switch>
            <Route path={ LOGIN } component={Login}></Route>
            <Route path={ REGISTER } component={Register}></Route>
        </Switch>
    );
};

export default AuthRouter;
