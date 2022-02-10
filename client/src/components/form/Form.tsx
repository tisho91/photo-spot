import Input from '../input/Input';
import FormButton from '../formButton/FormButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export interface FormDefinition {
    fields: any[],
    submitClickCallback: (data: any) => void,
    title?: string,
    validationSchema: any,
    submitButtonText: string,
    defaultValues?: any
}


const Form = (props: FormDefinition) => {
    const { fields, submitClickCallback, title, validationSchema, submitButtonText, defaultValues } = props;
    const { handleSubmit, register, formState: { errors } } = useForm<any>({
        defaultValues,
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = handleSubmit(data => submitClickCallback(data));

    return (
        <form onSubmit={ onSubmit }>
            <h2>{ title }</h2>
            {
                fields.map((item: any) =>
                    <Input
                        errors={ errors[item.id] }
                        register={ register }
                        key={ item.id }
                        { ...item }
                    />
                )
            }
            <div className="submit-wrapper">
                <FormButton className="submit-button" text={ submitButtonText } type="submit"/>
            </div>
        </form>
    );
};

export default Form;
