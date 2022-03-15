import { ReactElement } from 'react';

export interface FormDefinition {
    submitClickCallback: (data: SubmitData) => Promise<void>
    validationSchema: any;
    submitButtonText: string;
    defaultValues?: null|UserProfile;
    children?: ReactElement<any>[];
    className?: string
}


export interface SpotData {
    title: string
    description: string,
    address: string,
    images: Blob[]
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface UserProfile {
    name: string;
}

export interface UserProfileRequestData extends UserProfile {
    avatar: Blob;
}

export interface UserProfileFormData extends UserProfile {
    avatar: Blob[];
}

export interface RegisterCredentials extends LoginCredentials {
    name: string
}

export interface SubmitData extends SpotData, LoginCredentials, UserProfileFormData, RegisterCredentials {
}

export interface TokenData {
    token: string|null;
    tokenExpirationDate: string|null
}

export interface StyledChildComponent {
    className?: string;
}
