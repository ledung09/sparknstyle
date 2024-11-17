"use client";

import React, { useState } from "react";
import StatsCard from "./components/stats-card";
import PieChartSection from "./components/piechart";
import { Card } from "@/components/ui/card";
import TopProductSection from "./products/components/top-product";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";

export default function Page() {
  const elementRef = React.useRef<HTMLDivElement>(null); // Ref to the element to capture

  const generatePDF = async (): Promise<void> => {
    if (!elementRef.current) {
      console.error("Element not found.");
      return;
    }

    try {
      // Capture the element as an image
      const canvas = await html2canvas(elementRef.current);
      const imgData = canvas.toDataURL("image/png"); // Convert canvas to image data

      const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size

      // Add title
      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(20);
      pdf.text("SparknStyle Analytic Report", 10, 10);

      const imgWidth = 190; // A4 width in mm minus margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
      pdf.addImage(imgData, "PNG", 10, 20, imgWidth, imgHeight);

      pdf.save("sparknstyle-analytic.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["statChart"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_HOST_NAME}/stats/product`).then(
        (res) => res.json()
      ),
  });

  if (isPending)
    return (
      <div className="flex justify-center mt-6 min-h-screen">
        <Loader2 className="animate-spin" size={36} />
      </div>
    );

  console.log(data.pie);

  return (
    <div>
      <Button size={"sm"} onClick={generatePDF} className="mb-4">
        Export Analytics
      </Button>
      <div ref={elementRef}>
        <StatsCard />
        <div className="flex gap-4">
          <Card className="flex-1 p-6 shadow mt-4">
            <p className="tracking-tight text-sm font-medium mb-4">
              Purchase by Brand
            </p>
            <div className="flex justify-center">
              <PieChartSection data={data.pie} />
            </div>
          </Card>
          <Card className="flex-1 p-6 shadow mt-4">
            <p className="tracking-tight text-sm font-medium mb-6">
              Top purchase Products
            </p>
            <TopProductSection data={data.mostBuy} />
          </Card>
        </div>
      </div>
    </div>
  );
}
