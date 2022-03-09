import React from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { sendUpdateProfileRequest, userSelector } from '../../../state/authSlice';
import { HOME } from '../../../constants/routes';
import { Link } from 'react-router-dom';
import TextInput from '../../input/TextInput';
import ImageInput from '../../input/ImageInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const User = () => {
    const validationSchema = yup.object({
        name: yup.string().required(),
        avatar: yup.mixed().test('avatar', 'Must not be Empty', (files) => {
            return files.length;
        })
    }).required();

    const { name } = useSelector(userSelector)
    const dispatch = useDispatch();

    const { handleSubmit, register, formState: { errors } } = useForm<any>({
        defaultValues: { name },
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = handleSubmit((user: any) => async (user: any) => {
        const avatar = user.avatar[0];
        const fileReader = new FileReader();
        fileReader.onload = () => {
        }
        fileReader.readAsDataURL(avatar);
        dispatch(sendUpdateProfileRequest({ name: user.name, avatar }));
    });

    return (
        <div>
            <form onSubmit={ onSubmit }>
                <TextInput id="name" name="name"/>
                <ImageInput id="avatar" name="avatar"/>
            </form>
            <Link to={ HOME }>go back</Link>
        </div>
    )
}

export default User;
