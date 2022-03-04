import React from 'react';
import * as yup from 'yup';
import { sendRegisterRequest } from '../../../state/authSlice';
import { useDispatch } from 'react-redux';
import TextInput from '../../input/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

const Register = () => {
    const dispatch = useDispatch();
    const validationSchema = yup.object({
        name: yup.string().required(),
        email: yup.string().required().email(),
        password: yup.string().required(),
    }).required()

    const { handleSubmit, register, formState: { errors } } = useForm<any>({
        defaultValues: {},
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = handleSubmit((data: any) => {
        dispatch(sendRegisterRequest(data));
    });
    return (
        <div className="register-form">
            <form onSubmit={ onSubmit }>
                <TextInput register={ register } errors={ errors } id="name" name="name"/>
                <TextInput register={ register } errors={ errors } type="email" id="email" name="email"/>
                <TextInput register={ register } errors={ errors } type="password" id="password" name="password"/>
                <LoadingButton sx={ { bgcolor: 'red' } } loading={ false } type="submit"
                               variant="contained">
                    register
                </LoadingButton>
            </form>
        </div>
    );
};

export default Register;
