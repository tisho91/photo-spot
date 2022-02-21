import { FormControl, TextField } from '@material-ui/core';
import React from 'react';

const TextInput = (props: any) => {
    const { register, errors } = props;
    console.log(errors)
    return (
        <FormControl >
            <TextField
                error={ !!errors }
                { ...register(props.id) }
                type={ props.type }
                id={ props.id }
                helperText={ errors?.message }

            />
        </FormControl>
    );
};

export default TextInput;
