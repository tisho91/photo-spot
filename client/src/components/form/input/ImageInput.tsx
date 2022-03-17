import React from 'react';

const ImageInput = (props: any) => {
    const { register } = props;
    return (
        <>
            <input accept="image/*"
                   type="file"
                   id={ props.id }
                   { ...register(props.id) }
                   style={ { display: 'none' } }
                   multiple={ props.multiple }
            />
            <label htmlFor={ props.id }>
                <span>
                    Upload
                </span>
            </label>
        </>
    );
};

export default ImageInput;
