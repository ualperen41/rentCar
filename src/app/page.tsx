import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PickDropSelector from "@/components/home/PickDropSelector";
import CarCard from "@/components/cars/CarCard";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import { generateCarImageUrl } from "@/lib/carImages";

export const dynamic = "force-dynamic";

async function getFeaturedCars() {
  await connectDB();
  const popularCars = await Car.find({ availability: true }).limit(4).lean();
  const recommendedCars = await Car.find({ availability: true }).skip(4).limit(8).lean();

  return {
    popular: JSON.parse(JSON.stringify(popularCars)),
    recommended: JSON.parse(JSON.stringify(recommendedCars)),
  };
}

export default async function HomePage() {
  const { popular, recommended } = await getFeaturedCars();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface font-body-md text-on-surface">
      <Navbar />

      <main className="w-full pt-24 max-w-[1440px] mx-auto px-6">
        {/* HERO PROMOTION BANNERS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Banner 1: Primary Brand */}
          <div className="relative rounded-2xl p-6 sm:p-8 overflow-hidden bg-primary text-on-primary flex flex-col justify-between min-h-[340px] shadow-lg">
            <div className="relative z-10 max-w-sm space-y-3">
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                Araç Kiralamada En İyi Platform
              </h1>
              <p className="text-xs sm:text-sm text-on-primary/80 leading-relaxed">
                Güvenli, şeffaf ve uygun fiyatlı araç kiralama deneyimi. 7/24 VIP konsiyerj hizmeti ve kapıya teslim imkanı.
              </p>
              <div className="pt-2">
                <Link
                  href="/cars"
                  className="inline-block px-5 py-2.5 rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary font-semibold text-xs tracking-wide shadow-md transition-all cursor-pointer"
                >
                  Araç Kirala
                </Link>
              </div>
            </div>
            {/* Visual Accent */}
            <div className="relative z-10 mt-6 flex justify-end">
              <img
                src={generateCarImageUrl({ brand: "Nissan", model: "GT-R", year: 2023, angle: "29", fuelType: "Benzin" })}
                alt="Luxury Car Showcase"
                className="w-72 h-36 object-contain filter drop-shadow-xl"
              />
            </div>
            {/* Ambient background glow */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Banner 2: Secondary Brand */}
          <div className="relative rounded-2xl p-6 sm:p-8 overflow-hidden bg-secondary text-on-secondary flex flex-col justify-between min-h-[340px] shadow-lg">
            <div className="relative z-10 max-w-sm space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                Avantajlı Fiyatlarla Kolay Kiralama
              </h2>
              <p className="text-xs sm:text-sm text-on-secondary/80 leading-relaxed">
                Konforlu, bakımlı ve uzun yolculuklara hazır prestijli araçlarla yola çıkmanın en kolay yolu.
              </p>
              <div className="pt-2">
                <Link
                  href="/cars"
                  className="inline-block px-5 py-2.5 rounded-xl bg-secondary-container hover:bg-primary-container text-on-secondary-container font-semibold text-xs tracking-wide shadow-md transition-all cursor-pointer"
                >
                  Filoyu Gör
                </Link>
              </div>
            </div>
            {/* Visual Accent */}
            <div className="relative z-10 mt-6 flex justify-end">
              <img
                src={generateCarImageUrl({ brand: "Porsche", model: "911", year: 2024, angle: "23", fuelType: "Benzin" })}
                alt="Executive GT Car"
                className="w-72 h-36 object-contain filter drop-shadow-xl"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </section>

        {/* PICKUP / DROPOFF SELECTOR HUD */}
        <PickDropSelector />

        {/* POPULAR CAR SECTION */}
        <section className="my-10 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-on-surface-variant">Popüler Araçlar</h3>
            <Link
              href="/cars"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Tümünü Gör
            </Link>
          </div>

          {popular.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {popular.map((car: any) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
              <p className="text-sm text-on-surface-variant">
                Henüz araç bulunamadı. Veritabanını <code>/api/seed</code> endpointi ile doldurabilirsiniz.
              </p>
            </div>
          )}
        </section>

        {/* RECOMMENDATION CAR SECTION */}
        <section className="my-10 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-on-surface-variant">Önerilen Araçlar</h3>
            <Link
              href="/cars"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Tümünü Gör
            </Link>
          </div>

          {recommended.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {recommended.map((car: any) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
              <p className="text-sm text-on-surface-variant">Önerilen araçlar listelenemedi.</p>
            </div>
          )}

          {/* Show More Button */}
          <div className="pt-8 flex items-center justify-center">
            <Link
              href="/cars"
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs tracking-wide shadow-md transition-all cursor-pointer"
            >
              Daha Fazla Araç Göster
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
