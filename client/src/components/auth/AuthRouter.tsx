import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './login/Login';
import Register from './register/Register';
import { LOGIN, REGISTER } from '../../constants/routes';
import AuthNavigation from './AuthNavigation';
import { Box, Grid, Typography } from '@mui/material';


const AuthRouter: React.FC = () => {
    return (
        <Grid container>
            <Box>
                <Typography variant="h2" component="h2"
                            sx={ { fontFamily: 'Source Serif Pro', color: '#fff', fontWeight: 900 } }>
                    Photo Spot
                </Typography>
                <Typography variant="subtitle1" component="span"
                            sx={ { fontFamily: 'Source Serif Pro', color: '#F86E51', fontWeight: 400 } }
                            gutterBottom
                >
                    Upload the memories
                </Typography>
            </Box>
            <Switch>
                <Route path={ LOGIN } component={ Login }></Route>
                <Route path={ REGISTER } component={ Register }></Route>
            </Switch>
            <AuthNavigation/>
        </Grid>
    );
};

export default AuthRouter;
