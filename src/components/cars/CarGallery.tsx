"use client";

import { useState, useEffect } from "react";
import { CarVisual, getFallbackCarImage } from "@/lib/carImages";

interface GalleryProps {
  visuals: CarVisual;
  brand: string;
  model: string;
}

export default function CarGallery({ visuals, brand, model }: GalleryProps) {
  const angles = visuals.angles && visuals.angles.length > 0
    ? visuals.angles
    : [
        { angle: "01", label: "Açı 01 (Ana Açı)", url: visuals.main },
        { angle: "23", label: "3/4 Ön Açı", url: visuals.angle1 },
        { angle: "29", label: "Yüksek Açı", url: visuals.angle2 },
        { angle: "13", label: "3/4 Arka Açı", url: visuals.angle3 || visuals.interior },
      ];

  const defaultAngle =
    angles.find((item) => item.angle === "01" || item.angle === "1") || angles[0];
  const [selectedAngle, setSelectedAngle] = useState(defaultAngle);

  useEffect(() => {
    const initialAngle =
      angles.find((item) => item.angle === "01" || item.angle === "1") || angles[0];
    setSelectedAngle(initialAngle);
  }, [visuals]);

  return (
    <div className="space-y-4">
      {/* Featured Primary 3D Studio Canvas */}
      <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-b from-surface-container-lowest via-surface-container-low/30 to-surface-container-low/60 border border-outline-variant/30 shadow-sm p-4 sm:p-8 flex items-center justify-center group">
        {/* Angle Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-[11px] font-bold text-primary flex items-center gap-1.5 shadow-sm border border-outline-variant/30">
            <span className="material-symbols-outlined text-sm">3d_rotation</span>
            Açı: {selectedAngle.angle}°
          </span>
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-[11px] font-medium text-on-surface-variant border border-outline-variant/20">
            {selectedAngle.label}
          </span>
        </div>

        {/* 360 Studio Hint */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[10px] uppercase font-bold tracking-wider text-outline px-2.5 py-1 rounded-md bg-surface-container-lowest/70 border border-outline-variant/20">
            Stüdyo Görünümü
          </span>
        </div>

        {/* Dynamic Studio Car Render */}
        <img
          key={selectedAngle.url}
          src={selectedAngle.url}
          alt={`${brand} ${model} - ${selectedAngle.label}`}
          className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] transition-all duration-300 animate-fadeIn"
          onError={(e) => {
            e.currentTarget.src = getFallbackCarImage(brand);
          }}
        />

        {/* Subtle Floor Shadow Gradient */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/10 blur-xl rounded-full pointer-events-none" />
      </div>

      {/* Multi-Angle Selectors Row */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {angles.map((item) => {
          const isSelected = selectedAngle.angle === item.angle;
          return (
            <button
              key={item.angle}
              type="button"
              onClick={() => setSelectedAngle(item)}
              className={`relative flex flex-col items-center justify-between p-2 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-surface-container-lowest shadow-md ring-2 ring-primary/20"
                  : "border-outline-variant/30 bg-surface-container-lowest/60 hover:bg-surface-container-lowest hover:border-primary/40 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="w-full h-12 sm:h-16 flex items-center justify-center overflow-hidden">
                <img
                  src={item.url}
                  alt={`${brand} - ${item.label}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = getFallbackCarImage(brand);
                  }}
                />
              </div>
              <span className={`text-[10px] sm:text-[11px] font-semibold mt-1 truncate w-full text-center ${
                isSelected ? "text-primary" : "text-on-surface-variant"
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
