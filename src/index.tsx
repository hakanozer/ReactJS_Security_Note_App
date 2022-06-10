import React from 'react';
import ReactDOM from 'react-dom/client';
import { projectRouter } from './ProjectRouter';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render( projectRouter );
reportWebVitals();
