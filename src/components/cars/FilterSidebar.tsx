"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const CATEGORIES = ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback", "Electric"];
const CAPACITIES = [
  { label: "2 Kişilik", value: 2 },
  { label: "4 Kişilik", value: 4 },
  { label: "5 Kişilik", value: 5 },
  { label: "7 veya Daha Fazla", value: 7 },
];
const TRANSMISSIONS = [
  { label: "Otomatik", value: "Otomatik" },
  { label: "Manuel", value: "Manuel" },
];
const FUEL_TYPES = [
  { label: "Benzin", value: "Benzin" },
  { label: "Dizel", value: "Dizel" },
  { label: "Elektrik", value: "Elektrik" },
  { label: "Hibrit", value: "Hibrit" },
];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<number[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [selectedFuels, setSelectedFuels] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(150000);

  useEffect(() => {
    const cat = searchParams.get("category");
    setSelectedCategories(cat ? cat.split(",") : []);

    const cap = searchParams.get("capacity");
    setSelectedCapacities(cap ? cap.split(",").map(Number) : []);

    const trans = searchParams.get("transmission");
    setSelectedTransmissions(trans ? trans.split(",") : []);

    const fuel = searchParams.get("fuelType");
    setSelectedFuels(fuel ? fuel.split(",") : []);

    const price = searchParams.get("maxPrice");
    if (price) setMaxPrice(Number(price));
  }, [searchParams]);

  const applyFilters = (
    newCats = selectedCategories,
    newCaps = selectedCapacities,
    newTrans = selectedTransmissions,
    newFuels = selectedFuels,
    newPrice = maxPrice
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newCats.length > 0) params.set("category", newCats.join(","));
    else params.delete("category");

    if (newCaps.length > 0) params.set("capacity", newCaps.join(","));
    else params.delete("capacity");

    if (newTrans.length > 0) params.set("transmission", newTrans.join(","));
    else params.delete("transmission");

    if (newFuels.length > 0) params.set("fuelType", newFuels.join(","));
    else params.delete("fuelType");

    if (newPrice < 150000) {
      params.set("maxPrice", newPrice.toString());
    } else {
      params.delete("maxPrice");
    }

    params.set("page", "1");
    router.push(`/cars?${params.toString()}`);
  };

  const toggleCategory = (cat: string) => {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    setSelectedCategories(next);
    applyFilters(next, selectedCapacities, selectedTransmissions, selectedFuels, maxPrice);
  };

  const toggleCapacity = (cap: number) => {
    const next = selectedCapacities.includes(cap)
      ? selectedCapacities.filter((c) => c !== cap)
      : [...selectedCapacities, cap];
    setSelectedCapacities(next);
    applyFilters(selectedCategories, next, selectedTransmissions, selectedFuels, maxPrice);
  };

  const toggleTransmission = (t: string) => {
    const next = selectedTransmissions.includes(t)
      ? selectedTransmissions.filter((x) => x !== t)
      : [...selectedTransmissions, t];
    setSelectedTransmissions(next);
    applyFilters(selectedCategories, selectedCapacities, next, selectedFuels, maxPrice);
  };

  const toggleFuel = (f: string) => {
    const next = selectedFuels.includes(f)
      ? selectedFuels.filter((x) => x !== f)
      : [...selectedFuels, f];
    setSelectedFuels(next);
    applyFilters(selectedCategories, selectedCapacities, selectedTransmissions, next, maxPrice);
  };

  const handlePriceChange = (val: number) => {
    setMaxPrice(val);
  };

  const handlePriceRelease = () => {
    applyFilters(selectedCategories, selectedCapacities, selectedTransmissions, selectedFuels, maxPrice);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedCapacities([]);
    setSelectedTransmissions([]);
    setSelectedFuels([]);
    setMaxPrice(150);
    router.push("/cars");
  };

  return (
    <aside className="w-full lg:w-72 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-7 h-fit">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-base text-on-surface">Filtreler</h3>
        <button
          onClick={handleReset}
          className="text-xs text-primary hover:underline font-semibold"
        >
          Sıfırla
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-bold font-mono tracking-wider text-outline uppercase">
          KATEGORİ
        </h4>
        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 text-sm text-on-surface cursor-pointer select-none hover:text-primary transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
              />
              <span className="font-medium text-xs">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission Filter */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-bold font-mono tracking-wider text-outline uppercase">
          VİTES TÜRÜ
        </h4>
        <div className="space-y-2.5">
          {TRANSMISSIONS.map((trans) => (
            <label
              key={trans.value}
              className="flex items-center gap-3 text-sm text-on-surface cursor-pointer select-none hover:text-primary transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedTransmissions.includes(trans.value)}
                onChange={() => toggleTransmission(trans.value)}
                className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
              />
              <span className="font-medium text-xs">{trans.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fuel Type Filter */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-bold font-mono tracking-wider text-outline uppercase">
          YAKIT TÜRÜ
        </h4>
        <div className="space-y-2.5">
          {FUEL_TYPES.map((fuel) => (
            <label
              key={fuel.value}
              className="flex items-center gap-3 text-sm text-on-surface cursor-pointer select-none hover:text-primary transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedFuels.includes(fuel.value)}
                onChange={() => toggleFuel(fuel.value)}
                className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
              />
              <span className="font-medium text-xs">{fuel.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Capacity Filter */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-bold font-mono tracking-wider text-outline uppercase">
          KAPASİTE
        </h4>
        <div className="space-y-2.5">
          {CAPACITIES.map((cap) => (
            <label
              key={cap.value}
              className="flex items-center gap-3 text-sm text-on-surface cursor-pointer select-none hover:text-primary transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedCapacities.includes(cap.value)}
                onChange={() => toggleCapacity(cap.value)}
                className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
              />
              <span className="font-medium text-xs">{cap.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-bold font-mono tracking-wider text-outline uppercase">
            FİYAT (GÜNLÜK)
          </h4>
          <span className="text-xs font-bold text-on-surface font-mono">
            Maks: ₺{maxPrice.toLocaleString("tr-TR")}
          </span>
        </div>
        <input
          type="range"
          min="1500"
          max="150000"
          step="1000"
          value={maxPrice}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          onMouseUp={handlePriceRelease}
          onTouchEnd={handlePriceRelease}
          className="w-full accent-primary cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-outline font-mono">
          <span>₺1.500</span>
          <span>₺150.000</span>
        </div>
      </div>
    </aside>
  );
}
