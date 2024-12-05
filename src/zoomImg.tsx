import { memo, useEffect, useRef, useState } from 'react';

interface ZoomableImageProps {
    src: string;
    alt?: string;
    transitionTime?: number;
  }
  
  export const ZoomableImage: React.FC<ZoomableImageProps> = memo(
    ({ src, alt = 'Image', transitionTime = 1 }) => {
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
          ).toFixed(2);
  
          setScale((prevScale: number) =>
            prevScale === Number(targetScale) ? 1 : Number(targetScale)
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
          transition: `transform ${transitionTime}s ease-in`,
          width: '100%',
          height: 'auto',
        } as React.CSSProperties,
      };
  
      return (
        <div
          ref={imageRef}
          onClick={() => handleZoom()}
          aria-label={alt}
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