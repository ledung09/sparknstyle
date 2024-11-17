import { NormalizedLandmarkList } from "@mediapipe/face_mesh";

export default class Accessory {
  img: HTMLImageElement | null;
  scale: number;
  imgSrc: string;

  constructor(imgSrc: string, scale: number = 1.0) {
    this.img = null;
    this.scale = scale;
    this.imgSrc = imgSrc;
  }

  loadImage() {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Convert white pixels to transparent
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) {
            data[i + 3] = 0; // Set alpha to 0
          }
        }

        ctx.putImageData(imgData, 0, 0);

        this.img = new Image();
        this.img.onload = () => resolve();
        this.img.src = canvas.toDataURL();
      };
      img.onerror = reject;
      img.src = this.imgSrc;
    });
  }

  apply(
    ctx: CanvasRenderingContext2D,
    faceLandmarks: NormalizedLandmarkList,
    canvasWidth: number,
    canvasHeight: number
  ) : void
  {
    console.log(ctx);
    console.log(faceLandmarks);
    console.log(canvasWidth);
    console.log(canvasHeight);
    throw new Error('Each accessory must implement its own apply method');
  }
}
