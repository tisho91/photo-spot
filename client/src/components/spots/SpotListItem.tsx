import React from 'react';
import { Link } from 'react-router-dom';

const SpotListItem = (props: any) => {
    return (
        <Link to={ `/spots/${ props.id }` } style={ {
            width: '120px',
            margin: '0 10px'
        } }>
            <h1 style={ { fontSize: '16px' } }>{ props.title }</h1>
            <img style={ {
                width: '100px', height: '100px'
            } } src={ props.images[0].url }/>
        </Link>
    )
}

export default SpotListItem;
