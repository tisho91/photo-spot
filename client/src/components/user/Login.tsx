import React from 'react';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import { FormDefinition, UserCredentials } from '../../common/interfaces';
import { sendLoginRequest } from '../../state/userSlice';

import Form from '../form/Form';
import TextInput from '../form/input/TextInput';

import { email, password } from '../../common/utils';

const Login = () => {
    const dispatch = useDispatch();
    const validationSchema = yup.object({
        email,
        password
    }).required()


    const formDefinition: FormDefinition = {
        validationSchema,
        submitClickCallback: async (submitData: UserCredentials) => {
            dispatch(sendLoginRequest(submitData));
        },
        submitButtonText: 'Login'
    }
    return (
        <Form { ...formDefinition }>
            <TextInput type="email" id="email" name="email"/>
            <TextInput type="password" id="password" name="password"/>
        </Form>
    );
};

export default Login;
