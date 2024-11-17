import { FaceMesh, Results } from "@mediapipe/face_mesh";
import Accessory from "./accessories/Accessory";

export default class AccessoryOverlaySystem {
  accessories: Accessory[];
  faceMesh: FaceMesh;

  constructor() {
    this.accessories = [];
    this.faceMesh = new FaceMesh({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });
    this.faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
  }

  addAccessory(accessory: Accessory): void {
    this.accessories.push(accessory);
  }

  async applyAccessories(
    results: Results,
    canvasRef: React.RefObject<HTMLCanvasElement>
  ): Promise<void> {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(results.image, 0, 0, canvasWidth, canvasHeight);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      for (const faceLandmarks of results.multiFaceLandmarks) {
        for (const accessory of this.accessories) {
          try {
            accessory.apply(ctx, faceLandmarks, canvasWidth, canvasHeight);
          } catch (error) {
            console.error(`Error applying accessory ${accessory.imgSrc}:`, error);
          }
        }
      }
    }
  }
}
