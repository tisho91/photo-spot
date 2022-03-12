import React from 'react';
import Form from '../form/Form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createNewSpotRequest } from '../../state/spotSlice';
import TextInput from '../form/input/TextInput';
import GoogleAutocomplete from '../form/input/GoogleAutocomplete';
import ImageInput from '../form/input/ImageInput';
import { FormDefinition, SpotData } from '../../common/interfaces';
import { createFileReader } from '../../common/utils';

const SpotCreator = () => {
    const dispatch = useDispatch()
    const formDefinition: FormDefinition = {
        validationSchema: yup.object({
            title: yup.string().required(),
            description: yup.string(),
            address: yup.string().required(),
            images: yup.mixed().test('images', 'Must not be Empty', (files) => {
                return files.length;
            })
        }),
        submitClickCallback: async (spot: SpotData) => {
            const images = spot.images
            for (const image of images) {
                createFileReader(image)
            }
            dispatch(createNewSpotRequest({ ...spot, images }));
        },
        submitButtonText: 'Submit',
    }

    return (
        <div>
            <Form { ...formDefinition }>
                <TextInput id="title" name="title"/>
                <TextInput id="description" name="description"/>
                <GoogleAutocomplete id="address" name="address"/>
                <ImageInput id="images" name="images" multiple/>
            </Form>
        </div>
    );
};

export default SpotCreator;
