import * as yup from "yup";

export const nonEmptyString = yup.string().required();
export const emailValidation = yup.string().required().email();
export const passwordValidation = yup
  .string()
  .required()
  .test("len", "Must be at least 6 characters", (val: any) => val.length > 5);
export const avatarValidation = yup
  .mixed()
  .test("avatar", "Must not be Empty", (files: any) => {
    return files.length;
  });
