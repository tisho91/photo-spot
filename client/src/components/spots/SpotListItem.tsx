import React from 'react';
import { Link } from 'react-router-dom';

const SpotListItem = (props: any) => {
    const imgUrl = props.images[0]?.url || 'https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png'
    return (
        <li><Link to={ `/spots/${ props.id }` } style={ {
            width: '120px',
            margin: '0 10px'
        } }>
            <h1 style={ { fontSize: '16px' } }>{ props.title }</h1>
            <img style={ {
                width: '100px', height: '100px'
            } } src={ imgUrl }/>
        </Link>
        </li>
    )
}

export default SpotListItem;
