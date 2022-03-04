import React from 'react';
import AuthRouter from './AuthRouter';
import { Box, Grid } from '@mui/material';

const Auth = () => {
    const backgroundImageUrl = '../assets/images/splash-image-auth.png'
    return (

            <Grid container sx={ { height: '100vh' } }>
                <Grid item xs={ 12 } sm={ 8 } md={ 5 } sx={ { bgcolor: 'primary.main' } }>
                    <Box
                        sx={ {
                            my: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        } }
                    >
                        <AuthRouter/>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={ false }
                    sm={ 4 }
                    md={ 7 }
                    sx={ {
                        backgroundImage: `url(${ backgroundImageUrl })`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    } }
                />
            </Grid>

    );
};

export default Auth;
