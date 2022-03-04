import React from 'react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createNewSpotRequest } from '../../state/spotSlice';
import TextInput from '../input/TextInput';
import GoogleAutocomplete from '../input/GoogleAutocomplete';
import ImageInput from '../input/ImageInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const SpotCreator = () => {
    const dispatch = useDispatch()

    const validationSchema = yup.object({
        title: yup.string().required(),
        description: yup.string(),
        address: yup.string().required(),
        images: yup.mixed().test('images', 'Must not be Empty', (files) => {
            return files.length;
        })
    }).required();


    const { handleSubmit, register, formState: { errors } } = useForm<any>({
        defaultValues: {},
        resolver: yupResolver(validationSchema)
    });


    const onSubmit = handleSubmit(spot => {
        const images = spot.images
        for (let i = 0; i < images.length; i++) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
            }
            fileReader.readAsDataURL(images[i]);
        }
        dispatch(createNewSpotRequest({ ...spot, images }));
    });


    return (
        <div>
            <form onSubmit={ onSubmit }>
                <TextInput register={ register } errors={ errors } id="title" name="title"/>
                <TextInput register={ register } errors={ errors } id="description" name="description"/>
                <GoogleAutocomplete register={ register } errors={ errors } id="address" name="address"/>
                <ImageInput register={ register } errors={ errors } id="images" name="images" multiple/>
            </form>
        </div>
    );
};

export default SpotCreator;
