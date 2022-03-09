import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        primary: {
            main: '#171717',
        },
        text: {
            primary: '#00ff00',
        },
    },


    typography: {
        fontFamily: [
            'Source Serif Pro'
        ].join(',')
    }
});
const App: React.FC = () => {

    return (
        <div>
                {/*<Header/>*/ }
                <BrowserRouter>
                    <ThemeProvider theme={ theme }>
                        <AppRoutes/>
                    </ThemeProvider>
                </BrowserRouter>
        </div>
    );

}

export default App;
