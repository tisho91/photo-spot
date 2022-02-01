import React from 'react';
import Form, { FormDefinition } from '../form/Form';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, userSelector } from '../../state/userSlice';
import { authSelector } from '../../state/authSlice';
import { Link } from 'react-router-dom';
import { HOME } from '../../constants/routes';



const DisplayName = () => {
    const dispatch = useDispatch()
    const { uid } = useSelector(authSelector)
    const { hasAvatar } = useSelector(userSelector)
    const formDefinition:FormDefinition = {
        title: 'User Profile',
        initialValues:[],
        validationSchema: yup.object({}),
        submitClickCallback: (formData)=>{
            const data = { uid, userData: { ...formData, hasAvatar } }
            //TODO and this
            dispatch(setUserData(data))
        },
        fields: [
            {
                id: 'displayName',
                type: 'text',
                name: 'displayName',
            }
        ],
        submitButtonText: 'Submit'
    }


    return (
        <div>
            <Form {...formDefinition} />
            <Link to={ HOME }>Go back</Link>
        </div>
    );
};

export default DisplayName;
