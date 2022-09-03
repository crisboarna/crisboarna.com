import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
// import "bootstrap/dist/css/bootstrap.min.css";

import App from './app';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
