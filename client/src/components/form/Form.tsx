import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';


const Form = (props: any) => {
    const { submitClickCallback, validationSchema, submitButtonText, children, defaultValues } = props;
    const { handleSubmit, register, formState: { errors }, setValue } = useForm<any>({
        defaultValues,
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = handleSubmit(data => submitClickCallback(data));

    const renderChildElement = (child: any) => {
        return React.createElement(child.type, {
            ...{
                ...child.props,
                errors: errors[child.props.id],
                register,
                setValue,
                key: child.props.name
            }
        })
    }
    const renderChildren = () => {
        return (Array.isArray(children)
                ? children.map((child) => {
                    return child.props.name
                        ? renderChildElement(child)
                        : child;
                })
                : renderChildElement(children)
        )
    }
    return (
        <form onSubmit={ onSubmit }>
            { renderChildren() }
            <LoadingButton fullWidth loading={ false } type="submit" variant="outlined">
                { submitButtonText || 'text' }
            </LoadingButton>
        </form>
    );
};

export default Form;
