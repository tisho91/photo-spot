import React from 'react';
import './FormButton.scss'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    onClick?: () => void,
    className?: string,
    isLoading?: boolean
}


const FormButton: React.FC<ButtonProps> = props => {
    const { text, className, isLoading, ...otherProps } = props;
    return (
        <button
            className={ className } { ...otherProps }
            disabled={ isLoading }
        >
            { isLoading ? 'Loading' : text }
        </button>
    );
};

export default FormButton;
