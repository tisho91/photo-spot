import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './common/routes';
import { createGlobalStyle } from 'styled-components';


const imgUrl = '../../assets/images/background.png';

const GlobalStyle = createGlobalStyle`
  body{
      background-color: #171717;
      background-color: #171717;
      background-image: url(${imgUrl});
      background-size: contain;
      background-repeat: no-repeat;
     
  }
  a{
    text-decoration: none;
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active{
    -webkit-font-size: 28px;
     transition: background-color 5000s ease-in-out 0s;
    -webkit-box-shadow: 0 0 0 50px #393939 inset !important;
    -webkit-text-fill-color: #fff;
  }
`;
const App: React.FC = () => {
    return (
        <>
            <GlobalStyle/>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </>
    );
};

export default App;
