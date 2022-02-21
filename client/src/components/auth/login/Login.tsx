import Form from '../../form/Form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { sendLoginRequest } from '../../../state/authSlice';
import TextInput from '../../input/TextInput';
import React from 'react';

const Login = () => {
    const dispatch = useDispatch();
    const formDefinition = {
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().test('len', 'Must be at least 6 characters', (val: any) => val.length > 5)
        }).required(),

        submitClickCallback: async (data: any) => {
            dispatch(sendLoginRequest(data));
        }
    }
    return (
        <div>
            <Form { ...formDefinition }>
                <TextInput type='email' id="email" name="email"/>
                <TextInput type="password" id="password" name="password"/>
            </Form>
        </div>
    );
};

export default Login;
