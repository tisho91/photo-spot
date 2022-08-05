import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { spotsSelector } from '../../state/spotSlice';
import SpotListItem from './SpotListItem';
import { AppPaths } from '../../common/constants/routes';
import styled from 'styled-components';

const StyledSpotList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`;

const StyledListItem = styled.li`
  min-width: 120px;
  min-height: 120px;
  margin: 5px;
  background-color: #b7b7b7;
  border-radius: 10px;
`;

const AddNew = styled(StyledListItem)`
   display: flex;
   flex-flow: column;
    justify-content: center;
    align-items: center;
    background-color: #393939;
    border: 2px solid #F86E51;
   span{
       font-size: 14px;
       color: #fff;
       font-style: italic;
            &.icon {
            font-family: 'Material Icons';
            color: #F86E51;
            font-size: 36px;
            font-style: normal;
      }
  }
 
`;

const SpotList = () => {
    const { spots } = useSelector(spotsSelector);
    return (
        <StyledSpotList style={{}}>
            <Link to={AppPaths.AddSpot}>
                <AddNew>
                    <span className={'icon'}>add_circle</span>
                    <span>Add Location</span>
                </AddNew>
            </Link>

            {spots
                ? spots.map((spot: any) => {
                    return (
                        <StyledListItem key={spot.id}>
                            <SpotListItem {...spot} />
                        </StyledListItem>
                    );
                })
                : null}
        </StyledSpotList>
    );
};

export default SpotList;
