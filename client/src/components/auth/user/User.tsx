import React from 'react';
import Form  from '../../form/Form';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { sendUpdateProfileRequest, userSelector } from '../../../state/authSlice';
import { HOME } from '../../../constants/routes';
import { Link } from 'react-router-dom';
import TextInput from '../../input/TextInput';
import ImageInput from '../../input/ImageInput';

const User = () => {
    const { name } = useSelector(userSelector)
    const dispatch = useDispatch();
    const formDefinition = {
        title: 'User Profile',
        validationSchema: yup.object({
            name: yup.string().required(),
            avatar: yup.mixed().test('avatar', 'Must not be Empty', (files) => {
                return files.length;
            })
        }),
        defaultValues: {
            name
        },
        submitClickCallback: (user:any) => {
            const avatar = user.avatar[0];
            const fileReader = new FileReader();
            fileReader.onload = () => {
            }
            fileReader.readAsDataURL(avatar);
            dispatch(sendUpdateProfileRequest({ name: user.name, avatar }));
        },
        submitButtonText: 'Submit'
    }


    return (
        <div>
            <Form { ...formDefinition } >
                <TextInput id="name" name="name"/>
                <ImageInput id="avatar" name="avatar"/>
            </Form>
            <Link to={ HOME }>go back</Link>
        </div>
    )
}

export default User;
