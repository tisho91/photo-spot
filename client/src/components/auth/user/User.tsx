import Form, { FormDefinition } from '../../form/Form';
import * as yup from 'yup';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendUpdateProfileRequest, userSelector } from '../../../state/authSlice';
import { HOME } from '../../../constants/routes';
import { Link } from 'react-router-dom';

const User = () => {
    const { name } = useSelector(userSelector)
    const dispatch = useDispatch();
    const formDefinition: FormDefinition = {
        title: 'User Profile',
        validationSchema: yup.object({
            name: yup.string().required(),
        }),
        defaultValues: {
            name
        },
        submitClickCallback: (user) => {
            const avatar = user.avatar[0];
            const fileReader = new FileReader();
            fileReader.onload = () => {
            }
            fileReader.readAsDataURL(avatar);
            dispatch(sendUpdateProfileRequest({ name: user.name, avatar }));
        },
        fields: [
            {
                id: 'name',
                type: 'text',
                name: 'name',
            },
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
            <Link to={ HOME }>go back</Link>
        </div>
    )
}

export default User;
