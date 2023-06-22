import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Game } from './classes/game';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App game = {new Game()}/>
  </React.StrictMode>
);