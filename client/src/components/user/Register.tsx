import React from "react";
import { useDispatch } from "react-redux";

import * as yup from "yup";

import { FormProps, RegisterCredentials } from "../../common/types";
import { sendRegisterRequest } from "../../state/userSlice";

import {
  emailValidation,
  nonEmptyString,
  passwordValidation,
} from "../../common/utils";
import { AuthForm } from "./AuthForm";
import { FormInput } from "../form/input/StyledInputs";
import { AppPaths } from "../../common/constants/routes";
import AuthNavigation from "./AuthNavigation";

const Register = () => {
  const dispatch = useDispatch();
  const validationSchema = yup
    .object({
      name: nonEmptyString,
      email: emailValidation,
      password: passwordValidation,
    })
    .required();
  const formDefinition: FormProps = {
    validationSchema,
    submitClickCallback: async (registerData: RegisterCredentials) => {
      dispatch(sendRegisterRequest(registerData));
    },
    submitButtonText: "Register",
  };
  return (
    <>
      <AuthForm {...formDefinition}>
        <FormInput id="name" name="name" />
        <FormInput type="email" id="email" name="email" />
        <FormInput type="password" id="password" name="password" />
      </AuthForm>
      <AuthNavigation
        route={AppPaths.Login}
        linkText={"Login"}
        helperText={"Already registered?"}
      />
    </>
  );
};

export default Register;
