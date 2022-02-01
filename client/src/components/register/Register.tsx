import React from 'react';
import Form from '../form/Form';
import * as yup from 'yup';
import { sendRegisterRequest } from '../../state/authSlice';
import { useDispatch } from 'react-redux';

const Register = () => {
    const dispatch = useDispatch();

    const formDefinition = {
        title: 'Register',
        initialValues: {
            email: '',
            password: ''
        },
        fields: [
            {
                id: 'name',
                type: 'text',
                name: 'name',
            },
            {
                id: 'email',
                type: 'email',
                name: 'email',
            },
            {
                id: 'password',
                type: 'password',
                name: 'password',
            }
        ],
        validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().required().email(),
            password: yup.string().required(),
        }).required(),
        submitClickCallback: async (data: any) => {
            dispatch(sendRegisterRequest(data));
        },
        submitButtonText: 'Register'
    };
    return (
        <div className='register-form'>
            <Form {...formDefinition}/>
        </div>
    );
};

export default Register;
