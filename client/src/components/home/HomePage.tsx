import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../state/authSlice';
import { Link } from 'react-router-dom';
import { getAllSpotsRequest, spotsSelector } from '../../state/spotSlice';
import { UPDATE_AVATAR, UPDATE_DISPLAY_NAME } from '../../constants/routes';


const HomePage = () => {
    const { uid } = useSelector(authSelector)
    const { spots } = useSelector(spotsSelector)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSpotsRequest())
    }, [ dispatch ])
    return (
        <div>
            { spots.map((spot: any) => {
                // TODO add spot component
                return <div key={ spot.id }>{ spot.title }</div>
            }) }
            <Link to={ UPDATE_DISPLAY_NAME }>Edit Profile</Link>
            <Link to={ UPDATE_AVATAR }>Edit Avatar</Link>
        </div>
    );
};

export default HomePage;
