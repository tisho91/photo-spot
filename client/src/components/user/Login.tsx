import React from "react";
import { useDispatch } from "react-redux";

import * as yup from "yup";

import { sendLoginRequest } from "../../state/userSlice";
import { emailValidation, passwordValidation } from "../../common/utils";

import { AuthForm } from "./AuthForm";
import { FormInput } from "../form/input/StyledInputs";
import AuthNavigation from "./AuthNavigation";
import { AppPaths } from "../../common/constants/routes";
import { FormProps, LoginCredentials } from "../../common/types";

const Login = () => {
  const dispatch = useDispatch();
  const validationSchema = yup
    .object({
      email: emailValidation,
      password: passwordValidation,
    })
    .required();

  const formDefinition: FormProps = {
    validationSchema,
    submitClickCallback: async (loginData: LoginCredentials) => {
      dispatch(sendLoginRequest(loginData));
    },
    submitButtonText: "Login",
  };
  return (
    <>
      <AuthForm {...formDefinition}>
        <FormInput type="email" id="email" name="email" />
        <FormInput type="password" id="password" name="password" />
      </AuthForm>
      <AuthNavigation
        route={AppPaths.Register}
        linkText={"Register"}
        helperText={"Don’t have an account?"}
      />
    </>
  );
};

export default Login;
