import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { spotsSelector } from '../../state/spotSlice';
import SpotListItem from './SpotListItem';
import { ADD_SPOT } from '../../constants/routes';

const SpotList = () => {
    const { spots } = useSelector(spotsSelector);
    return (
        <div style={ { display: 'flex', flexWrap: 'wrap' } }>
            { !!spots ? spots.map((spot: any) => {
                return <SpotListItem key={ spot.id } { ...spot }/>
            }) : null }
            <Link to={ ADD_SPOT }>Add new</Link>
        </div>
    )
}

export default SpotList;
