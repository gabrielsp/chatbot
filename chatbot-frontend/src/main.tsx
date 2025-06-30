import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { AOSProvider } from './contexts/AOSContext';

// Adicionar fontes
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const montserratLink = document.createElement('link');
montserratLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
montserratLink.rel = 'stylesheet';
document.head.appendChild(montserratLink);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AOSProvider>
      <App />
    </AOSProvider>
  </React.StrictMode>
);