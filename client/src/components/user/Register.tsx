import React from 'react';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import { FormDefinition, SpotData } from '../../common/interfaces';
import { sendRegisterRequest } from '../../state/userSlice';

import Form from '../form/Form';
import TextInput from '../form/input/TextInput';

import { email, nonEmptyString, password } from '../../common/utils';

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
        <Form { ...formDefinition }>
            <TextInput id="name" name="name"/>
            <TextInput type="email" id="email" name="email"/>
            <TextInput type="password" id="password" name="password"/>
        </Form>
    );
};

export default Register;
