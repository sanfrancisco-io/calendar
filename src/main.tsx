import { StrictMode } from 'react';
import 'react-calendar/dist/Calendar.css';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// scan({ enabled: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
