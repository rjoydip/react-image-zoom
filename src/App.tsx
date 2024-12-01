import reactLogo from './assets/react.svg';
import './App.css';
import { memo, useEffect, useRef, useState, KeyboardEvent } from 'react';

interface ZoomableImageProps {
  src: string;
  alt?: string;
  zoomStep?: number;
  maxZoom?: number;
  minZoom?: number;
}

const ZoomableImage: React.FC<ZoomableImageProps> = memo(
  ({ src, alt = 'Image', zoomStep = 0.1, maxZoom = 3, minZoom = 0.5 }) => {
    const [scale, setScale] = useState<number>(1);
    const imageRef = useRef<HTMLDivElement>(null);

    // Adjust zoom level
    const handleZoom = (step: number) => {
      setScale((prevScale) =>
        Math.min(maxZoom, Math.max(minZoom, prevScale + step))
      );
    };

    // Keyboard controls for zoom
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === '+' || event.key === '=') {
        handleZoom(zoomStep);
      } else if (event.key === '-') {
        handleZoom(-zoomStep);
      }
    };

    // Focusable container for keyboard events
    useEffect(() => {
      const imageContainer = imageRef.current;
      if (imageContainer) {
        imageContainer.focus();
      }
    }, []);

    const styles = {
      image: {
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        transition: 'transform 0.3s ease',
        width: '100%',
        height: 'auto',
      } as React.CSSProperties,
    };

    return (
      <div ref={imageRef} onKeyDown={handleKeyDown} aria-label="Zoomable Image">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={styles.image}
          draggable={false}
        />
        <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
          <button onClick={() => handleZoom(zoomStep)}>Zoom In</button>
          <button onClick={() => handleZoom(-zoomStep)}>Zoom Out</button>
        </div>
      </div>
    );
  }
);

function App() {
  return <ZoomableImage src={reactLogo} alt="Sample Image" />;
}

export default App;
