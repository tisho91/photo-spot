import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, userSelector } from '../../state/authSlice';
import FormButton from '../formButton/FormButton';


const Header = () => {
    const { id, name } = useSelector(userSelector);
    const dispatch = useDispatch();
    const signOutButtonProps = {
        text: 'Sign Out',
        className: 'sign-out',
        onClick: () => {
            dispatch(logout())
        }
    }


    return (
        <div className="header">
            <div className="welcome-message">
                <span>{ name ? `Hello ${ name }` : 'Welcome' }</span>
            </div>
            { id ?
                <div className="sign-out-wrapper">
                    <FormButton { ...signOutButtonProps }/>
                </div>
                : null }
        </div>
    );
};

export default Header;
