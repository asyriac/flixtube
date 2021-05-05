import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PlaylistContextProvider } from './contexts/playlist-context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PlaylistContextProvider>
        <App />
      </PlaylistContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);