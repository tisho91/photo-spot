import React from 'react';
import AuthNavigation from "./AuthNavigation";
import AuthRouter from "./AuthRouter";
import './Auth.scss'

const Auth = () => {
    return (
        <div className='auth-container'>
            <div className='auth-navigation'>
                <AuthNavigation />
            </div>
            <div className='form-container'>
                <AuthRouter/>
            </div>
        </div>
    );
};

export default Auth;
