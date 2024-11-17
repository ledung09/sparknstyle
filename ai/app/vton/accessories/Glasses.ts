import { NormalizedLandmarkList } from '@mediapipe/face_mesh';
import Accessory from './Accessory';

export default class Glasses extends Accessory {
  constructor(imgSrc: string, scale: number = 1.8) {
    super(imgSrc, scale);
  }

  apply(
    ctx: CanvasRenderingContext2D,
    faceLandmarks: NormalizedLandmarkList,
    canvasWidth: number,
    canvasHeight: number
  ): void 
  {
    const leftEye = faceLandmarks[33]; // Left eye
    const rightEye = faceLandmarks[263]; // Right eye

    if (!leftEye || !rightEye || !this.img) {
      return;
    }

    const leftEyeX = leftEye.x * canvasWidth;
    const leftEyeY = leftEye.y * canvasHeight;
    const rightEyeX = rightEye.x * canvasWidth;
    const rightEyeY = rightEye.y * canvasHeight;

    const deltaX = rightEyeX - leftEyeX;
    const deltaY = rightEyeY - leftEyeY;
    const angleRadians = Math.atan2(deltaY, deltaX);

    const eyeCenterX = (leftEyeX + rightEyeX) / 2;
    const eyeCenterY = (leftEyeY + rightEyeY) / 2;

    const eyeDistance = Math.hypot(deltaX, deltaY);
    const glassesWidth = eyeDistance * this.scale;
    const glassesHeight = (this.img.height / this.img.width) * glassesWidth;

    ctx.save();
    ctx.translate(eyeCenterX, eyeCenterY);
    ctx.rotate(angleRadians);

    ctx.drawImage(
      this.img,
      -glassesWidth / 2,
      -glassesHeight / 2,
      glassesWidth,
      glassesHeight
    );

    ctx.restore();
  }
}
