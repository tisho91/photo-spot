import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as yup from 'yup';

import { AppPaths } from '../../common/constants/routes';
import { FormDefinition, UserProfileWithAvatar } from '../../common/interfaces';
import { sendUpdateProfileRequest, userSelector } from '../../state/userSlice';

import Form from '../form/Form';
import TextInput from '../form/input/TextInput';
import ImageInput from '../form/input/ImageInput';


import { avatar, createFileReader, nonEmptyString } from '../../common/utils';

const Profile = () => {
    const { name } = useSelector(userSelector)
    const dispatch = useDispatch();
    const validationSchema = yup.object({
        name: nonEmptyString,
        avatar
    }).required()
    const formDefinition: FormDefinition = {
        validationSchema,
        defaultValues: {
            name
        },
        submitClickCallback: async (user: UserProfileWithAvatar) => {
            const avatar = user.avatar[0];
            createFileReader(avatar)
            dispatch(sendUpdateProfileRequest({ name: user.name, avatar }));
        },
        submitButtonText: 'Submit',
    }


    return (
        <>
            <Form { ...formDefinition } >
                <TextInput id="name" name="name"/>
                <ImageInput id="avatar" name="avatar"/>
            </Form>
            <Link to={ AppPaths.Home }>go back</Link>
        </>
    )
}

export default Profile;
