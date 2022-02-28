import { FormControl, TextField } from '@material-ui/core';
import React, { memo } from 'react';

const TextInput = memo((props: any) => {
    const { register, errors } = props;
    return (
        <FormControl>
            <TextField
                inputProps={ { autoComplete: 'off' } }
                type={ props.type }
                id={ props.id }
                error={ !!errors }
                helperText={ errors?.message }
                { ...register(props.id) }

            />
        </FormControl>
    );
});

export default TextInput;
