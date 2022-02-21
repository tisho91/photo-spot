import React from 'react';
import Form  from '../form/Form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createNewSpotRequest } from '../../state/spotSlice';

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
        submitClickCallback: (spot:any) => {
            const images = spot.images
            console.log(images);

            for (let i = 0; i < images.length; i++) {
                const fileReader = new FileReader();
                fileReader.onload = () => {}
                fileReader.readAsDataURL(images[i]);
            }
            console.log(images)
            dispatch(createNewSpotRequest({ ...spot, images }));
        },
        fields: [
            {
                id: 'title',
                type: 'text',
                name: 'title',
            }, {
                id: 'description',
                type: 'text',
                name: 'description',
            }, {
                id: 'address',
                type: 'text',
                name: 'address',
            },
            {
                id: 'images',
                type: 'file',
                name: 'images',
                accept: 'image/png, image/jpeg',
                multiple: true // TODO - make multiple images per spot
            }
        ],
        submitButtonText: 'Submit'
    }

    return (
        <div>
            <Form { ...formDefinition }/>
        </div>
    );
};

export default SpotCreator;
