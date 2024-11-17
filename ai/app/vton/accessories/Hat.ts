import { NormalizedLandmarkList } from '@mediapipe/face_mesh';
import Accessory from './Accessory';

export default class Hat extends Accessory {
  constructor(imgSrc: string, scale: number = 1.5) {
    super(imgSrc, scale);
  }

  apply(
    ctx: CanvasRenderingContext2D,
    faceLandmarks: NormalizedLandmarkList,
    canvasWidth: number,
    canvasHeight: number
  ): void 
  {
    if (!this.img) {
      return;
    }
    const forehead = faceLandmarks[10]; // Forehead
    const leftHead = faceLandmarks[127]; // Left side of head
    const rightHead = faceLandmarks[356]; // Right side of head

    const foreheadX = forehead.x * canvasWidth;
    const foreheadY = forehead.y * canvasHeight;
    const leftHeadX = leftHead.x * canvasWidth;
    const leftHeadY = leftHead.y * canvasHeight;
    const rightHeadX = rightHead.x * canvasWidth;
    const rightHeadY = rightHead.y * canvasHeight;

    const deltaX = rightHeadX - leftHeadX;
    const deltaY = rightHeadY - leftHeadY;
    const angleRadians = Math.atan2(deltaY, deltaX);

    const headWidth = Math.hypot(deltaX, deltaY);
    const hatWidth = headWidth * this.scale;
    const hatHeight = (this.img.height / this.img.width) * hatWidth;

    const headCenterX = foreheadX;
    const headCenterY = foreheadY - hatHeight / 2;

    ctx.save();
    ctx.translate(headCenterX, headCenterY);
    ctx.rotate(angleRadians);

    ctx.drawImage(
      this.img,
      -hatWidth / 2,
      -hatHeight / 2,
      hatWidth,
      hatHeight
    );

    ctx.restore();
  }

}
