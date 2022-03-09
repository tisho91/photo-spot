import React from 'react';
import AuthRouter from "./AuthRouter";

const Auth = () => {
    const backgroundImageUrl = '../assets/images/splash-image-auth.png'
    return (
        <div className='auth-container'>
            <div className='form-container'>
                <AuthRouter/>
            </div>
        </div>
    );
};

export default Auth;
