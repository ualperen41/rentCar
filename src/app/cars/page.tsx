import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/cars/FilterSidebar";
import PickDropSelector from "@/components/home/PickDropSelector";
import CarCard from "@/components/cars/CarCard";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";

export const dynamic = "force-dynamic";

interface SearchProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    capacity?: string;
    maxPrice?: string;
    transmission?: string;
    fuelType?: string;
    page?: string;
    sortBy?: string;
  }>;
}

export default async function CarsPage({ searchParams }: SearchProps) {
  const params = await searchParams;
  await connectDB();

  const page = Math.max(1, parseInt(params.page || "1", 10));
  const limit = 9;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = { availability: true };

  if (params.search?.trim()) {
    filter.$or = [
      { brand: { $regex: params.search.trim(), $options: "i" } },
      { model: { $regex: params.search.trim(), $options: "i" } },
    ];
  }

  if (params.category) {
    const cats = params.category.split(",").map((c) => c.trim());
    if (cats.length > 0) filter.category = { $in: cats };
  }

  if (params.capacity) {
    const caps = params.capacity.split(",").map((c) => parseInt(c.trim(), 10)).filter(Boolean);
    if (caps.length > 0) filter.seatingCapacity = { $in: caps };
  }

  if (params.maxPrice) {
    const price = parseFloat(params.maxPrice);
    if (!isNaN(price)) filter.dailyPrice = { $lte: price };
  }

  if (params.transmission) {
    const trans = params.transmission.split(",").map((t) => t.trim());
    if (trans.length > 0) filter.transmission = { $in: trans };
  }

  if (params.fuelType) {
    const fuels = params.fuelType.split(",").map((f) => f.trim());
    if (fuels.length > 0) filter.fuelType = { $in: fuels };
  }

  const skip = (page - 1) * limit;

  const [totalCars, cars] = await Promise.all([
    Car.countDocuments(filter),
    Car.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
  ]);

  const totalPages = Math.ceil(totalCars / limit);
  const serializedCars = JSON.parse(JSON.stringify(cars));

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface font-body-md text-on-surface">
      <Navbar />

      <main className="w-full pt-24 max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 my-6">
          {/* Sidebar Filter */}
          <FilterSidebar />

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            <PickDropSelector />

            <div className="flex items-center justify-between pt-2">
              <h2 className="font-bold text-lg text-on-surface">
                Müsait Araçlar ({totalCars})
              </h2>
              {params.search && (
                <span className="text-xs text-on-surface-variant">
                  &ldquo;{params.search}&rdquo; için arama sonuçları
                </span>
              )}
            </div>

            {serializedCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                {serializedCars.map((car: any) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            ) : (
              <div className="p-16 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/30 space-y-3">
                <span className="material-symbols-outlined text-4xl text-outline">
                  search_off
                </span>
                <p className="font-bold text-base text-on-surface">Kriterlerinize uygun araç bulunamadı</p>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                  Daha fazla lüks ve spor aracı görebilmek için sol taraftaki filtreleri temizlemeyi veya esnetmeyi deneyin.
                </p>
                <Link
                  href="/cars"
                  className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Filtreleri Temizle
                </Link>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 pb-4 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  const isCurrent = pNum === page;
                  return (
                    <Link
                      key={pNum}
                      href={`/cars?page=${pNum}${params.category ? `&category=${params.category}` : ""}${
                        params.capacity ? `&capacity=${params.capacity}` : ""
                      }${params.maxPrice ? `&maxPrice=${params.maxPrice}` : ""}${
                        params.search ? `&search=${encodeURIComponent(params.search)}` : ""
                      }`}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? "bg-primary text-on-primary shadow-sm"
                          : "bg-surface-container-lowest hover:bg-surface-container-high text-on-surface border border-outline-variant/30"
                      }`}
                    >
                      {pNum}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
