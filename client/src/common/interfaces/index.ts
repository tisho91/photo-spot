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

export interface UserCredentials {
    email: string;
    password: string;
}

export interface UserProfile {
    name: string;
}

export interface UserProfileWithAvatar extends UserProfile {
    avatar: Blob[];
}

export interface RegisterCredentials extends UserCredentials {
    name: string
}

export interface SubmitData extends SpotData, UserCredentials, UserProfileWithAvatar, RegisterCredentials {
}

export interface TokenData {
    token: string|null;
    tokenExpirationDate: string|null
}

export interface StyledChildComponent {
    className?: string;
}
