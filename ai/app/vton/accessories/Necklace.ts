import { NormalizedLandmarkList } from '@mediapipe/face_mesh';
import Accessory from './Accessory';

export default class Necklace extends Accessory {
  constructor(imgSrc: string, scale: number = 1.3) {
    super(imgSrc, scale);
  }

  apply(
    ctx: CanvasRenderingContext2D,
    faceLandmarks: NormalizedLandmarkList,
    canvasWidth: number,
    canvasHeight: number
  ): void 
  {
    const chin = faceLandmarks[152]; // Chin
    const leftJaw = faceLandmarks[234]; // Left jaw
    const rightJaw = faceLandmarks[454]; // Right jaw

    if (!chin || !leftJaw || !rightJaw || !this.img) {
      return;
    }

    const chinX = chin.x * canvasWidth;
    const chinY = chin.y * canvasHeight;
    const leftJawX = leftJaw.x * canvasWidth;
    const leftJawY = leftJaw.y * canvasHeight;
    const rightJawX = rightJaw.x * canvasWidth;
    const rightJawY = rightJaw.y * canvasHeight;

    const chinWidth = Math.hypot(rightJawX - leftJawX, rightJawY - leftJawY);
    const necklaceWidth = chinWidth * this.scale;
    const necklaceHeight = (this.img.height / this.img.width) * necklaceWidth;

    const necklaceX = chinX;
    const necklaceY = chinY + necklaceHeight * 0.7;

    ctx.save();
    ctx.translate(necklaceX, necklaceY);

    ctx.drawImage(
      this.img,
      -necklaceWidth / 2,
      -necklaceHeight / 2,
      necklaceWidth,
      necklaceHeight
    );

    ctx.restore();
  }
}
