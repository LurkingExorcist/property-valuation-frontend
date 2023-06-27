import * as React from 'react';
import { useEffect, useState } from 'react';

import { StarsRenderer } from '@/lib';

export const StarsBackground = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const [starsController, setStarsController] = useState<StarsRenderer>();

  const resizeCanvas = React.useCallback(() => {
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, [canvas]);

  const initStars = React.useCallback(() => {
    if (!canvas) return;
    stopStars();

    const controller = new StarsRenderer({ canvas });
    controller.init();

    setStarsController(controller);
  }, [canvas]);

  const stopStars = React.useCallback(() => {
    if (starsController) starsController.destroy();
  }, [starsController]);

  useEffect(() => {
    initStars();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      stopStars();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvas]);

  return (
    <canvas
      id="canvas"
      ref={setCanvas}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};
