import { beforeEach, describe, expect, it } from 'vitest'
import { render, fireEvent } from '@testing-library/react';
import reactLogo from './assets/react.svg'
import { ZoomableImage } from './zoomImg';

describe('ZoomableImage Component', async () => {
  const mockSrc = reactLogo;
  const mockAlt = 'Sample Image';

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1200 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 });
  })

  it('renders the image correctly', () => {
    const { getByAltText } = render(<ZoomableImage src={mockSrc} alt={mockAlt} />);
    const imgElement = getByAltText(mockAlt);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockSrc);
    expect(imgElement).toHaveAttribute('loading', 'lazy');
  });

  it('toggles the scale on click', async () => {
    const { getByAltText } = render(
      <ZoomableImage src={mockSrc} alt={mockAlt} transitionTime={1} />
    );

    const imgElement = getByAltText(mockAlt).parentElement;

    if (imgElement) {
      const imgNode = imgElement.firstChild as HTMLImageElement;

      Object.defineProperty(imgNode, 'clientWidth', { value: 32, enumerable: true, configurable: true });
      Object.defineProperty(imgNode, 'clientHeight', { value: 32, enumerable: true, configurable: true });

      fireEvent.click(imgElement); // Trigger zoom
      expect(imgNode).toHaveStyle('transform: scale(25)');

      Object.defineProperty(imgNode, 'clientWidth', { value: 320, writable: true, enumerable: true, configurable: true });
      Object.defineProperty(imgNode, 'clientHeight', { value: 285, writable: true, enumerable: true, configurable: true });

      fireEvent.click(imgElement); // Toggle back
      expect(imgNode).toHaveStyle('transform: scale(2.81)');
    }
  });

  it('focuses on the container after rendering', () => {
    const { baseElement } = render(<ZoomableImage src={mockSrc} alt={mockAlt} />);
    expect(baseElement).toHaveFocus();
  });
});
