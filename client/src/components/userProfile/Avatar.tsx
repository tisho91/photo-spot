import React from 'react';
import Form, { FormDefinition } from '../form/Form';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAvatar, userSelector } from '../../state/userSlice';
import { authSelector } from '../../state/authSlice';


const Avatar = () => {
    const dispatch = useDispatch();
    const { uid } = useSelector(authSelector);
    const { avatar } = useSelector(userSelector);
    const formDefinition: FormDefinition = {
        title: 'Avatar',
        initialValues: [],
        validationSchema: yup.object({}),
        submitClickCallback: (userData) => {
            const avatar = userData.avatar[0];
            const fileReader = new FileReader();
            fileReader.onload = () => {
            }
            fileReader.readAsDataURL(avatar);
            //TODO Fix this
            dispatch(setUserAvatar({ avatar, uid }))
        },
        fields: [
            {
                id: 'avatar',
                type: 'file',
                name: 'avatar',
                accept: 'image/png, image/jpeg',
                multiple: false
            }
        ],
        submitButtonText: 'Submit'
    }


    return (
        <div>
            <Form { ...formDefinition } />
            <img src={ avatar }/>
        </div>
    );
};

export default Avatar;
