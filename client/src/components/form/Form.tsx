import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormDefinition } from '../../common/interfaces';
import { SubmitButton } from './input/StyledButtons';


const Form = (props: FormDefinition) => {
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
        <form className={ props.className } onSubmit={ onSubmit }>
            { renderChildren() }
            <SubmitButton type="submit">
                { submitButtonText || 'text' }
            </SubmitButton>
        </form>
    );
};

export default Form;
