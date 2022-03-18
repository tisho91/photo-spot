import { ReactElement } from 'react';

export type FormProps = {
  submitClickCallback: any;
  validationSchema: any;
  submitButtonText: string;
  defaultValues?: null | UserProfile;
  children?: ReactElement<any>[];
  className?: string;
};

export type UserProfile = {
  name: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & UserProfile;

export type UserProfileFormData = UserProfile & {
  avatar: Blob[];
};

export type UserProfileRequestData = UserProfile & {
  avatar: Blob;
};

export type SpotData = {
  title: string;
  description: string;
  address: string;
  images: Blob[];
};

export type SubmitData =
  | SpotData
  | LoginCredentials
  | UserProfileFormData
  | RegisterCredentials;

export type StyledChildComponent = {
  className?: string;
};

export type ErrorMessage = {
  message: string;
};

export type TextInputProps = {
  props: any;
  register: (id: string) => void;
  setValue?: () => void;
  errors: ErrorMessage;
  id: string;
  className?: string;
  type: string;
  name: string;
};
