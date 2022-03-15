import React from 'react';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import { FormDefinition, LoginCredentials } from '../../common/interfaces';
import { sendLoginRequest } from '../../state/userSlice';
import { email, password } from '../../common/utils';

import { AuthForm } from './AuthForm';
import { FormInput } from '../form/input/StyledInputs';
import AuthNavigation from './AuthNavigation';
import { AppPaths } from '../../common/constants/routes';


const Login = () => {
    const dispatch = useDispatch();
    const validationSchema = yup.object({
        email,
        password
    }).required()


    const formDefinition: FormDefinition = {
        validationSchema,
        submitClickCallback: async (submitData: LoginCredentials) => {
            dispatch(sendLoginRequest(submitData));
        },
        submitButtonText: 'Login'
    }
    return (
        <>
            <AuthForm { ...formDefinition }>
                <FormInput type="email" id="email" name="email"/>
                <FormInput type="password" id="password" name="password"/>
            </AuthForm>
            <AuthNavigation route={ AppPaths.Register } linkText={ 'Register' }
                            helperText={ 'Don’t have an account?' }/>
        </>
    );
};

export default Login;
