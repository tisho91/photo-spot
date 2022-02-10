import React from 'react';
import { useSelector } from 'react-redux';
import { spotsSelector } from '../../state/spotSlice';
import SpotListItem from './SpotListItem';

const SpotList = () => {
    const { spots } = useSelector(spotsSelector);
    return (
        <div style={ { display: 'flex' } }>
            { !!spots ? spots.map((spot: any) => {
                return <SpotListItem key={ spot.id } { ...spot }/>
            }) : null }
        </div>
    )
}

export default SpotList;
