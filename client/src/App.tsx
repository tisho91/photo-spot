import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './common/routes';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-size: 10px;
  }
`
const App: React.FC = () => {
    return (
        <>
            <GlobalStyle/>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </>
    );

}

export default App;
