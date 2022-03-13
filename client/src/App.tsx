import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './common/routes';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active{
    font-size: 16px;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
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
