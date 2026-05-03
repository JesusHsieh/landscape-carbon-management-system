import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress Recharts ResizeObserver pre-layout warning (cosmetic only, charts render correctly)
const _warn = console.warn.bind(console);
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('width(-1) and height(-1)')) return;
  _warn(...args);
};

createRoot(document.getElementById('root')!).render(<App />);
