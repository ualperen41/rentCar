import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CarGallery from "@/components/cars/CarGallery";
import CarCard from "@/components/cars/CarCard";
import CarReservationForm from "@/components/cars/CarReservationForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import mongoose from "mongoose";
import { getCarVisuals } from "@/lib/carImages";

export const dynamic = "force-dynamic";

interface DetailProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailPage({ params }: DetailProps) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectDB();
  const carDoc = await Car.findById(id).lean();

  if (!carDoc) {
    notFound();
  }

  const car = JSON.parse(JSON.stringify(carDoc));
  const visuals = getCarVisuals(car.brand, car.model, car.year, car.fuelType);

  // Recommendations
  const relatedCarsDocs = await Car.find({
    _id: { $ne: carDoc._id },
    category: car.category,
  })
    .limit(4)
    .lean();

  const relatedCars = JSON.parse(JSON.stringify(relatedCarsDocs));

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface font-body-md text-on-surface">
      <Navbar />

      <main className="w-full pt-24 max-w-[1440px] mx-auto px-6">
        {/* Breadcrumb */}
        <div className="py-4 text-xs text-on-surface-variant flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">
            Ana Sayfa
          </Link>
          <span>/</span>
          <Link href="/cars" className="hover:text-primary transition-colors">
            Araçlar
          </Link>
          <span>/</span>
          <span className="font-semibold text-on-surface">
            {car.brand} {car.model}
          </span>
        </div>

        {/* Main Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-4">
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-6 xl:col-span-7">
            <CarGallery visuals={visuals} brand={car.brand} model={car.model} />
          </div>

          {/* Right Column: Specification & Reservation HUD */}
          <div className="lg:col-span-6 xl:col-span-5 bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">
                    {car.brand} {car.model}
                  </h1>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs">
                    {car.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex text-amber-500">
                    {"★★★★★"}
                  </div>
                  <span className="font-bold text-on-surface">{car.rating || 4.9}</span>
                  <span className="text-on-surface-variant font-mono">
                    ({car.reviewsCount || 440}+ Reviews)
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {car.description ||
                  "NISMO has become the embodiment of Koenigsegg and Nissan's outstanding performance, inspired by the most uncompromising automotive engineering."}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs py-2 border-y border-outline-variant/20">
                <div className="flex justify-between py-1">
                  <span className="text-outline">Araç Tipi</span>
                  <span className="font-semibold text-on-surface">{car.category}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-outline">Kapasite</span>
                  <span className="font-semibold text-on-surface">{car.seatingCapacity} Kişilik</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-outline">Vites</span>
                  <span className="font-semibold text-on-surface">{car.transmission}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-outline">Yakıt / Depo</span>
                  <span className="font-semibold text-on-surface">{car.fuelType} ({car.tankCapacity})</span>
                </div>
              </div>

              {/* Amenities / Features List */}
              {car.features && car.features.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-outline font-mono">
                    Öne Çıkan Donanımlar
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-surface-container-low text-on-surface-variant text-xs font-medium border border-outline-variant/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reservation Booking Form */}
            <CarReservationForm car={car} />
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/30 my-8 space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-lg text-on-surface">Müşteri Değerlendirmeleri</h2>
            <span className="px-3 py-0.5 rounded-full bg-primary text-on-primary text-xs font-bold">
              13
            </span>
          </div>

          <div className="space-y-6">
            {/* Review 1 */}
            <div className="space-y-3 pb-6 border-b border-outline-variant/20">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary font-bold flex items-center justify-center text-xs">
                    AB
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">Alperen Buğra</h4>
                    <p className="text-xs text-outline">Teknoloji Girişimcisi • İstanbul</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-outline font-mono">18 Eylül 2026</span>
                  <div className="flex text-amber-500 text-xs mt-1">{"★★★★★"}</div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Morent üzerinden kiraladığımız araç tam vaktinde ve kusursuz temizlikte teslim edildi. Anahtarsız dijital erişim ve rezervasyon hızı gerçekten üst seviye. Kesinlikle tavsiye ederim.
              </p>
            </div>

            {/* Review 2 */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary font-bold flex items-center justify-center text-xs">
                    SD
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">Selin Demir</h4>
                    <p className="text-xs text-outline">Yönetici Ortak • İzmir</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-outline font-mono">12 Ağustos 2026</span>
                  <div className="flex text-amber-500 text-xs mt-1">{"★★★★★"}</div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                İş seyahatlerimizde Morent&apos;in sunduğu geniş ve lüks araç filosu işimizi çok kolaylaştırıyor. Fiyat-performans dengesi ve müşteri hizmetleri yaklaşımı takdire şayan.
              </p>
            </div>
          </div>
        </section>

        {/* Similar Vehicles Grid */}
        {relatedCars.length > 0 && (
          <section className="my-10 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-on-surface-variant">Benzer Araçlar</h3>
              <Link href="/cars" className="text-xs font-semibold text-primary hover:underline">
                Tümünü Gör
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCars.map((related: any) => (
                <CarCard key={related._id} car={related} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
