"use client";

import React, { useEffect, useRef } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import AccessoryOverlaySystem from './AccessoryOverlaySystem';
import Glasses from './accessories/Glasses';
import Hat from './accessories/Hat';
import Necklace from './accessories/Necklace';

import glassesImage from './assets/accessories/glasses/glasses_5.png';
import hatImage from './assets/accessories/hats/hat_1.png';
import necklaceImage from './assets/accessories/necklaces/necklace_1.png';

function VirtualTryOn(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlaySystemRef = useRef<AccessoryOverlaySystem | null>(null);

  useEffect(() => {
    let camera: Camera | null = null;

    const initializeAccessories = async () => {
      overlaySystemRef.current = new AccessoryOverlaySystem();

      const glassesImagePath = glassesImage.src;
      const hatImagePath = hatImage.src;
      const necklaceImagePath = necklaceImage.src;

      const glasses = new Glasses(glassesImagePath, 1.8);
      const hat = new Hat(hatImagePath, 1.5);
      const necklace = new Necklace(necklaceImagePath, 1.2);

      await Promise.all([
        glasses.loadImage(),
        hat.loadImage(),
        necklace.loadImage(),
      ]);

      overlaySystemRef.current.addAccessory(glasses);
      overlaySystemRef.current.addAccessory(hat);
      overlaySystemRef.current.addAccessory(necklace);

      overlaySystemRef.current.faceMesh.onResults(async (results) => {
        if (overlaySystemRef.current && canvasRef.current) {
          await overlaySystemRef.current.applyAccessories(results, canvasRef);
        }
      });

      if (videoRef.current) {
        camera = new Camera(videoRef.current, {
          onFrame: async () => {
            if (overlaySystemRef.current) {
              await overlaySystemRef.current.faceMesh.send({ image: videoRef.current! });
            }
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    };

    initializeAccessories();

    // Cleanup function
    return () => {
      if (camera) {
        camera.stop();
      }
      if (overlaySystemRef.current) {
        overlaySystemRef.current.faceMesh.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>Virtual Try-On</h1>
      <div style={{ position: 'relative', width: '640px', height: '480px' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width="640"
          height="480"
          style={{ display: 'none' }}
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>
    </div>
  );
}

export default VirtualTryOn;