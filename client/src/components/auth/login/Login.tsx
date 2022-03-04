import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { sendLoginRequest } from '../../../state/authSlice';
import TextInput from '../../input/TextInput';
import React from 'react';
import { Box, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';


const Login = () => {
    const dispatch = useDispatch();
    const validationSchema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().test('len', 'Must be at least 6 characters', (val: any) => val.length > 5)
    }).required();


    const { handleSubmit, register, formState: { errors } } = useForm<any>({
        defaultValues: {},
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = handleSubmit(data => {
        dispatch(sendLoginRequest(data));
    });
    return (
        <Grid container>
            <Box  component="form" onSubmit={ onSubmit }>
                <TextInput variant={ 'outlined' } register={ register } errors={ errors } type="email"
                           id="email"
                           name="email"/>
                <TextInput variant={ 'outlined' } register={ register } errors={ errors } type="password"
                           id="password"
                           name="password"/>
                <LoadingButton sx={ { bgcolor: 'red' } } loading={ false } type="submit"
                               variant="contained">
                    Login
                </LoadingButton>
            </Box>
        </Grid>
    );
};

export default Login;

