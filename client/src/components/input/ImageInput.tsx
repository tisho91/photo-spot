import React from 'react';
import Button from '@mui/material/Button';

const ImageInput = (props: any) => {
    const { register } = props;
    return (
        <>
            <label htmlFor={ props.id }>
                <input accept="image/*"
                       type="file"
                       id={ props.id }
                       { ...register(props.id) }
                       style={ { display: 'none' } }
                       multiple={props.multiple}
                />
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
        </>
    );
};

export default ImageInput;
