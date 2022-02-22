import React from 'react';
import Form from '../form/Form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createNewSpotRequest } from '../../state/spotSlice';
import TextInput from '../input/TextInput';

const SpotCreator = () => {
    const dispatch = useDispatch()
    const formDefinition = {
        title: 'Create Spot',
        validationSchema: yup.object({
            title: yup.string().required(),
            description: yup.string(),
            address: yup.string().required(),
            images: yup.mixed().test('images', 'Must not be Empty', (files) => {
                return files.length;
            })
        }),
        submitClickCallback: (spot: any) => {
            const images = spot.images
            for (let i = 0; i < images.length; i++) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                }
                fileReader.readAsDataURL(images[i]);
            }
            dispatch(createNewSpotRequest({ ...spot, images }));
        },
        submitButtonText: 'Submit'
    }

    return (
        <div>
            <Form { ...formDefinition }>
                <TextInput id="title" name="title"/>
                <TextInput id="description" name="description"/>
                <TextInput id="address" name="address"/>
                <TextInput type="file" id="images" name="images"/>

            </Form>
        </div>
    );
};

export default SpotCreator;
