import Header from './components/header/Header';
import { BrowserRouter } from 'react-router-dom';

import React from 'react';

import AppRoutes from './Routes';

const App: React.FC = () => {

    return (
            <div>
                <div>
                    <Header/>
                        <BrowserRouter>
                           <AppRoutes/>
                        </BrowserRouter>
                </div>
            </div>
        );

}

export default App;
