import React from 'react';
import { Link } from "react-router-dom";
import { LOGIN, REGISTER } from '../../common/constants/routes';
const AuthNavigation = () => {
    return (
        <div >
            <Link to={ LOGIN }>Login</Link>
            <Link to={ REGISTER }>Register</Link>
        </div>
    );
};

export default AuthNavigation;
