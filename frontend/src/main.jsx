import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

// StrictMode is intentionally disabled:
// react-locomotive-scroll@0.2.2 can break with
// React 18+ double-invoked effects.

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
