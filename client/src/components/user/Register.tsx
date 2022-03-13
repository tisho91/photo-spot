import React from 'react';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import { FormDefinition, SpotData } from '../../common/interfaces';
import { sendRegisterRequest } from '../../state/userSlice';


import { email, nonEmptyString, password } from '../../common/utils';
import { AuthForm } from './AuthForm';
import { FormInput } from '../form/input/StyledInputs';
import { AppPaths } from '../../common/constants/routes';
import AuthNavigation from './AuthNavigation';


const Register = () => {
    const dispatch = useDispatch();
    const validationSchema = yup.object({
        name: nonEmptyString,
        email,
        password
    }).required();
    const formDefinition: FormDefinition = {
        validationSchema,
        submitClickCallback: async (data: SpotData) => {
            dispatch(sendRegisterRequest(data));
        },
        submitButtonText: 'Register'
    }
    return (
        <>
            <AuthForm { ...formDefinition }>
                <FormInput id="name" name="name"/>
                <FormInput type="email" id="email" name="email"/>
                <FormInput type="password" id="password" name="password"/>
            </AuthForm>
            <AuthNavigation route={ AppPaths.Login } linkText={ 'Login' } helperText={ 'Already registered?' }/>
        </>
    );
};

export default Register;
