import './Input.scss';

export type InputProps = {
    name?: string,
    type?: string,
    id?: string,
    register: any,
    errors:any
}


const Input: React.FC<any> = (props: InputProps) => {

    const { register, errors, ...otherProps } = props;
    const className = `form-input ${errors ? 'invalid' : ''}`;

    return (
        <div className={className}>
            <label htmlFor={otherProps.id}>{otherProps.name}</label>
            <input {...register(otherProps.id)} {...otherProps} />
            {errors ? <span className='error-message'>{errors.message}</span> : null}
        </div>
    );
};


export default Input;
