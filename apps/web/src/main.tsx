import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery/dist/jquery.min.js';
import 'react-lazy-load-image-component/src/effects/blur.css';

import App from './app';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
