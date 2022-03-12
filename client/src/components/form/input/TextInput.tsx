import React from 'react';

const TextInput = (props: any) => {
    const { register, setValue, errors, ...rest } = props;
    return (
        <>
            <input
                autoComplete="off"
                { ...register(props.id) }
                { ...rest }
            />
            {
                errors ? (
                    <span>{ errors.message }</span>
                ) : null
            }
        </>
    );
};

export default TextInput;
