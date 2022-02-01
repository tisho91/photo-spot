import React from 'react';
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, sendLogoutRequest } from '../../state/authSlice';
import FormButton from '../formButton/FormButton';
import { userSelector } from '../../state/userSlice';



const Header= () => {
    const { uid } = useSelector(authSelector);
    const { displayName } = useSelector(userSelector);
    const dispatch = useDispatch();
    const signOutButtonProps = {
        text: 'Sign Out',
        className: 'sign-out',
        onClick: ()=>{
            dispatch(sendLogoutRequest())
        }
    }


    return (
        <div className='header'>
            <div className='welcome-message'>
                <span>{displayName? `Hello ${displayName}`: 'Welcome'}</span>
            </div>
            { uid ?
                <div className='sign-out-wrapper'>
                    <FormButton {...signOutButtonProps}/>
                </div>
                : null}
        </div>
    );
};

export default Header;
