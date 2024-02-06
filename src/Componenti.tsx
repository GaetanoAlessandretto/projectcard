import React from 'react';
import './index.css';
import App from './App';
import { StateProvider } from './context';
import Preferiti from './Preferiti';

function Componenti() {
    return (
        <StateProvider>
            <App />,
            <Preferiti />,
        </StateProvider>
    )
}

export default Componenti