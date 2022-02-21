import React from 'react';
import Form from '../../form/Form';
import * as yup from 'yup';
import { sendLoginRequest, sendRegisterRequest } from '../../../state/authSlice';
import { useDispatch } from 'react-redux';
import TextInput from '../../input/TextInput';

const Register = () => {
    const dispatch = useDispatch();
    const formDefinition = {
        validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().required().email(),
            password: yup.string().required(),
        }).required(),
        submitClickCallback: async (data: any) => {
            dispatch(sendRegisterRequest(data));
        },
    }
    return (
        <div className='register-form'>
            <Form {...formDefinition}>
                <TextInput id="name" name="name"/>
                <TextInput type='email' id="email" name="email"/>
                <TextInput type="password" id="password" name="password"/>
            </Form>
        </div>
    );
};

export default Register;
