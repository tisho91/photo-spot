import * as yup from 'yup';

export const nonEmptyString = yup.string().required();
export const email = yup.string().required().email();
export const password = yup.string().required().test('len', 'Must be at least 6 characters', (val: any) => val.length > 5)
export const avatar = yup.mixed().test('avatar', 'Must not be Empty', (files: any) => {
    return files.length;
})

