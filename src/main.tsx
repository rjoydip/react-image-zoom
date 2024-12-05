import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import reactLogo from './assets/react.svg';
import { ZoomableImage } from './zoomImg';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ZoomableImage src={reactLogo} alt="Sample Image" transitionTime={2} />
  </StrictMode>
);
