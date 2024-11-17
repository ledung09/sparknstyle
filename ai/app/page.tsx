"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import AccessoryOverlaySystem from "./vton/AccessoryOverlaySystem";
import Glasses from "./vton/accessories/Glasses";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CameraIcon, GlassesIcon } from "lucide-react";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlaySystemRef = useRef<AccessoryOverlaySystem | null>(null);

  const [glassesOn, setGlassesOn] = useState(true);
  const glassesRef = useRef<Glasses | null>(null);
  const [error, setError] = useState<string | null>(null);

  const param = useSearchParams();
  let image = param.get("image");

  if (image) {
    try {
      image = decodeURIComponent(image);
    } catch (error) {
      image = null;
      console.error("Failed to decode the image:", error);
    }
  }

  useEffect(() => {
    if (!image) {
      setError("No image provided. Cannot apply virtual try-on.");
      return;
    }

    let camera: Camera | null = null;

    const initializeAccessories = async () => {
      try {
        overlaySystemRef.current = new AccessoryOverlaySystem();

        const glassesImagePath = image;
        const glasses = new Glasses(glassesImagePath, 1.8);
        glassesRef.current = glasses;

        await glasses.loadImage();

        if (glassesOn) {
          overlaySystemRef.current.addAccessory(glasses);
        }

        overlaySystemRef.current.faceMesh.onResults(async (results) => {
          if (overlaySystemRef.current && canvasRef.current) {
            await overlaySystemRef.current.applyAccessories(results, canvasRef);
          }
        });

        if (videoRef.current) {
          const desiredWidth = 1920;
          const desiredHeight = 1080;

          camera = new Camera(videoRef.current, {
            onFrame: async () => {
              if (overlaySystemRef.current) {
                await overlaySystemRef.current.faceMesh.send({
                  image: videoRef.current!,
                });
              }
            },
            width: desiredWidth,
            height: desiredHeight,
          });

          camera.start();
        }
      } catch (err) {
        console.error("Error initializing accessories:", err);
        setError("Failed to initialize virtual try-on system.");
      }
    };

    initializeAccessories();

    return () => {
      if (camera) {
        camera.stop();
      }
      if (overlaySystemRef.current) {
        overlaySystemRef.current.faceMesh.close();
      }
    };
  }, [image]);

  useEffect(() => {
    if (overlaySystemRef.current && image) {
      overlaySystemRef.current.accessories = [];

      if (glassesOn && glassesRef.current) {
        overlaySystemRef.current.addAccessory(glassesRef.current);
      }
    }
  }, [glassesOn, image]);

  const captureFrame = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const link = document.createElement("a");

      link.href = canvas.toDataURL("image/png");
      link.download = "captured-frame.png";
      link.click();
    }
  };

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8d7da",
          color: "#721c24",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <div
        style={{
          position: "relative",
          flex: 1,
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "85vw",
            aspectRatio: "16 / 9",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
            }}
          />
        </div>
      </div>
      <div className="px-4 gap-3 flex flex-col justify-center items-center w-[216px]">
        <Image
          alt="Spark&Style logo"
          src={"/web-logo.png"}
          height={0}
          width={0}
          className="w-[144px] absolute top-4 mr-3"
          priority
        />
        <Button
          variant={"outline"}
          className="w-full"
          size={"sm"}
          onClick={() => setGlassesOn((prev) => !prev)}
          disabled={!image}
        >
          <GlassesIcon className="" />
          {glassesOn ? "Remove Glasses" : "Add Glasses"}
        </Button>
        <Button onClick={captureFrame} className="w-full" size={"sm"}>
          <CameraIcon className="mb-0.5" />
          Capture Frame
        </Button>
        {!image && (
          <p style={{ color: "#dc3545", textAlign: "center" }}>
            Please provide an image to try on accessories.
          </p>
        )}
      </div>
    </div>
  );
}
