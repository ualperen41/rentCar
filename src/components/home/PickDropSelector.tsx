"use client";

import { useState } from "react";

export default function PickDropSelector() {
  const [pickupCity, setPickupCity] = useState("İstanbul - Beşiktaş");
  const [pickupDate, setPickupDate] = useState("2026-10-10");
  const [pickupTime, setPickupTime] = useState("09:00");

  const [dropoffCity, setDropoffCity] = useState("İstanbul - Kadıköy");
  const [dropoffDate, setDropoffDate] = useState("2026-10-12");
  const [dropoffTime, setDropoffTime] = useState("09:00");

  const handleSwap = () => {
    const tempCity = pickupCity;
    const tempDate = pickupDate;
    const tempTime = pickupTime;

    setPickupCity(dropoffCity);
    setPickupDate(dropoffDate);
    setPickupTime(dropoffTime);

    setDropoffCity(tempCity);
    setDropoffDate(tempDate);
    setDropoffTime(tempTime);
  };

  const turkeyLocations = [
    "İstanbul - Beşiktaş",
    "İstanbul - Kadıköy",
    "İstanbul - Levent",
    "Ankara - Çankaya",
    "İzmir - Alsancak",
    "Antalya - Muratpaşa",
    "Muğla - Bodrum Marina",
    "Bursa - Nilüfer",
  ];

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 my-8 items-center">
      {/* Pick-Up Section */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xs border border-outline-variant/30">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-primary" />
          </span>
          <span className="font-bold text-sm text-on-surface">Alış Noktası (Pick - Up)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface block">Teslimat Konumu</label>
            <select
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
              className="w-full bg-transparent text-xs text-on-surface-variant outline-none cursor-pointer py-1"
            >
              {turkeyLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-outline-variant/30 sm:pl-4 pt-2 sm:pt-0">
            <label className="text-xs font-bold text-on-surface block">Tarih</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-transparent text-xs text-on-surface-variant outline-none cursor-pointer py-1"
            />
          </div>

          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-outline-variant/30 sm:pl-4 pt-2 sm:pt-0">
            <label className="text-xs font-bold text-on-surface block">Saat</label>
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full bg-transparent text-xs text-on-surface-variant outline-none cursor-pointer py-1"
            >
              <option value="07:00">07:00</option>
              <option value="09:00">09:00</option>
              <option value="12:00">12:00</option>
              <option value="15:00">15:00</option>
              <option value="18:00">18:00</option>
              <option value="21:00">21:00</option>
            </select>
          </div>
        </div>
      </div>

      {/* Switch Button (Center floating on desktop) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <button
          onClick={handleSwap}
          type="button"
          aria-label="Konumları değiştir"
          className="w-14 h-14 rounded-2xl bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">swap_vert</span>
        </button>
      </div>

      {/* Drop-Off Section */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xs border border-outline-variant/30">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-4 h-4 rounded-full bg-secondary/20 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-secondary" />
          </span>
          <span className="font-bold text-sm text-on-surface">İade Noktası (Drop - Off)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface block">İade Konumu</label>
            <select
              value={dropoffCity}
              onChange={(e) => setDropoffCity(e.target.value)}
              className="w-full bg-transparent text-xs text-on-surface-variant outline-none cursor-pointer py-1"
            >
              {turkeyLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-outline-variant/30 sm:pl-4 pt-2 sm:pt-0">
            <label className="text-xs font-bold text-on-surface block">Tarih</label>
            <input
              type="date"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="w-full bg-transparent text-xs text-on-surface-variant outline-none cursor-pointer py-1"
            />
          </div>

          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-outline-variant/30 sm:pl-4 pt-2 sm:pt-0">
            <label className="text-xs font-bold text-on-surface block">Saat</label>
            <select
              value={dropoffTime}
              onChange={(e) => setDropoffTime(e.target.value)}
              className="w-full bg-transparent text-xs text-on-surface-variant outline-none cursor-pointer py-1"
            >
              <option value="07:00">07:00</option>
              <option value="09:00">09:00</option>
              <option value="12:00">12:00</option>
              <option value="15:00">15:00</option>
              <option value="18:00">18:00</option>
              <option value="21:00">21:00</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
