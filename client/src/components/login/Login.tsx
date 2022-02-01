import Form, { FormDefinition } from '../form/Form';
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { sendLoginRequest } from '../../state/authSlice';


const Login = () => {
    const dispatch = useDispatch();

    const formDefinition:FormDefinition = {
        title: 'Login',
        initialValues: {
            email: '',
            password: ''
        },
        fields: [
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
            email: yup.string().required().email(),
            password: yup.string().required().test('len', 'Must be at least 6 characters', (val:any) => val.length > 5)
        }).required(),
        submitClickCallback: async (data: any) => {
             dispatch(sendLoginRequest(data));
        },
        submitButtonText: 'Login'
    };

    return (
        <div className='login-form'>
            <Form {...formDefinition}/>
        </div>
    );
};

export default Login;
