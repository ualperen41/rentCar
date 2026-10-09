import Link from "next/link";
import Image from "next/image";
import { getCarVisuals } from "@/lib/carImages";

export interface CarProps {
  _id?: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  fuelType: string;
  tankCapacity: string;
  seatingCapacity: number;
  dailyPrice: number;
  discountPrice?: number | null;
  availability: boolean;
  rating?: number;
}

/**
 * CarCard - React Server Component (RSC)
 * Rendered purely on the server without client bundle overhead.
 */
export default function CarCard({ car }: { car: CarProps }) {
  const visual = getCarVisuals(car.brand, car.model, car.year, car.fuelType);

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 border border-outline-variant/30 hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-2 min-h-[48px]">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold tracking-wider uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-md inline-block mb-1">
              {car.category}
            </span>
            <h3
              className="font-bold text-base text-on-surface group-hover:text-primary transition-colors truncate"
              title={`${car.brand} ${car.model}`}
            >
              <Link href={`/cars/${car._id}`}>
                {car.brand} {car.model}
              </Link>
            </h3>
          </div>
        </div>

        {/* Vehicle Image using Next.js Image Optimization */}
        <Link
          href={`/cars/${car._id}`}
          className="relative my-4 aspect-[16/10] w-full flex items-center justify-center overflow-hidden rounded-xl bg-surface-container-low/40 p-2 group/img block"
        >
          <Image
            src={visual.main}
            alt={`${car.brand} ${car.model}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        </Link>

        {/* Specifications Badges (Stacked 3-column grid for zero wrapping) */}
        <div className="grid grid-cols-3 gap-1 py-2 px-1.5 bg-surface-container-low/60 rounded-xl text-center my-3">
          <div className="flex flex-col items-center justify-center px-1">
            <span className="material-symbols-outlined text-primary text-[18px]">
              local_gas_station
            </span>
            <span
              className="text-[11px] font-medium text-on-surface-variant truncate w-full mt-0.5"
              title={car.tankCapacity ? `${car.fuelType} (${car.tankCapacity})` : car.fuelType}
            >
              {car.tankCapacity || car.fuelType}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center px-1 border-x border-outline-variant/20">
            <span className="material-symbols-outlined text-primary text-[18px]">
              settings
            </span>
            <span
              className="text-[11px] font-medium text-on-surface-variant truncate w-full mt-0.5"
              title={car.transmission}
            >
              {car.transmission}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center px-1">
            <span className="material-symbols-outlined text-primary text-[18px]">
              group
            </span>
            <span
              className="text-[11px] font-medium text-on-surface-variant truncate w-full mt-0.5"
              title={`${car.seatingCapacity} Kişilik`}
            >
              {car.seatingCapacity} Kişi
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 mt-2">
        <div className="flex flex-col justify-center min-h-[40px]">
          <div className="flex items-baseline gap-1">
            <span className="font-bold text-lg sm:text-xl text-on-surface font-mono">
              ₺{car.dailyPrice.toLocaleString("tr-TR")}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">/gün</span>
          </div>
          <div className="h-4">
            {car.discountPrice ? (
              <span className="text-xs text-outline line-through block font-mono">
                ₺{car.discountPrice.toLocaleString("tr-TR")}/gün
              </span>
            ) : null}
          </div>
        </div>

        <Link
          href={`/cars/${car._id}`}
          className="h-9 sm:h-10 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs tracking-wide shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center whitespace-nowrap cursor-pointer"
        >
          İncele
        </Link>
      </div>
    </div>
  );
}
