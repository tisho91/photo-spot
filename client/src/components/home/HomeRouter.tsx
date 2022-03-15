import React from 'react';
import { Switch } from 'react-router';
import { PrivateRoute } from '../../common/PrivateRoute';
import { AppPaths } from '../../common/constants/routes';
import SpotCreator from '../spots/SpotCreator';
import SpotList from '../spots/SpotList';
import Spot from '../spots/Spot';
import Profile from '../user/Profile';

const HomeRouter = () => {
    return (
        <Switch>
            <PrivateRoute path={ AppPaths.AddSpot } component={ SpotCreator } exact/>
            <PrivateRoute path={ AppPaths.SpotList } component={ SpotList } exact/>
            <PrivateRoute path={ AppPaths.SpotListItem } component={ Spot } exact/>
            <PrivateRoute path={ AppPaths.EditUser } component={ Profile } exact/>
        </Switch>
    );
};

export default HomeRouter;
