import reactLogo from './assets/react.svg';
import './App.css';
import { memo, useEffect, useRef, useState } from 'react';

interface ZoomableImageProps {
  src: string;
  alt?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = memo(
  ({ src, alt = 'Image' }) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const [scale, setScale] = useState<number>(1);
    const imageRef = useRef<HTMLDivElement>(null);

    // Adjust zoom level based on window and image dimensions
    const handleZoom = () => {
      const imgElement = imageRef.current?.children[0] as HTMLImageElement;

      // TODO: Calculate scale based on window clientHeight, clientWidth with document clientHeight, clientWidth
      if (imgElement) {
        const imgWidth = imgElement.clientWidth;
        const imgHeight = imgElement.clientHeight;

        // Calculate the scale ratio
        const targetScale = Math.min(
          windowWidth / imgWidth,
          windowHeight / imgHeight
        );

        setScale((prevScale: number) =>
          prevScale === targetScale ? 1 : targetScale
        );
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
        transition: 'transform 1s ease-in',
        width: '100%',
        height: 'auto',
      } as React.CSSProperties,
    };

    return (
      <div
        ref={imageRef}
        onClick={() => handleZoom()}
        aria-label="Zoomable Image"
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={styles.image}
          draggable={false}
        />
      </div>
    );
  }
);

function App() {
  return <ZoomableImage src={reactLogo} alt="Sample Image" />;
}

export default App;
