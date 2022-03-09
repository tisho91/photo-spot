import React from 'react';
import { TextField } from '@material-ui/core';

const TextInput = (props: any) => {
    const { register, errors, ...rest } = props;
    return (
        <TextField
            inputProps={ { autoComplete: 'off' } }
            error={ !!errors }
            { ...register(props.id) }
            { ...rest }
        />
    );
};

export default TextInput;
