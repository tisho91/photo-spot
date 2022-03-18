import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as yup from 'yup';

import { AppPaths } from '../../common/constants/routes';
import { sendUpdateProfileRequest, userSelector } from '../../state/userSlice';

import Form from '../form/Form';
import TextInput from '../form/input/TextInput';
import ImageInput from '../form/input/ImageInput';

import {
  avatarValidation,
  createFileReader,
  nonEmptyString,
} from '../../common/utils';
import { FormProps, UserProfileFormData } from '../../common/types';

const Profile = () => {
  const { name, avatar } = useSelector(userSelector);
  const dispatch = useDispatch();
  const validationSchema = yup
    .object({
      name: nonEmptyString,
      avatar: avatarValidation,
    })
    .required();
  const formDefinition: FormProps = {
    validationSchema,
    defaultValues: {
      name,
    },
    submitClickCallback: async (user: UserProfileFormData) => {
      const avatar = user.avatar[0];
      createFileReader(avatar);
      dispatch(sendUpdateProfileRequest({ name: user.name, avatar }));
    },
    submitButtonText: 'Submit',
  };

  return (
    <>
      <Form {...formDefinition}>
        <TextInput id="name" name="name" />
        <ImageInput id="avatar" name="avatar" previewUrls={[avatar]} />
      </Form>
      <Link to={AppPaths.Home}>go back</Link>
    </>
  );
};

export default Profile;
