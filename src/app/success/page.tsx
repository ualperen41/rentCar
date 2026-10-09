import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { getCarVisuals } from "@/lib/carImages";
import { getOrder } from "@/lib/orders";

export const dynamic = "force-dynamic";

interface SuccessPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { orderId } = await searchParams;

  const order: any = orderId ? await getOrder(orderId) : null;
  const car = order?.car || null;
  const visuals = car
    ? getCarVisuals(car.brand, car.model, car.year, car.fuelType)
    : null;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="w-full pt-28 pb-16 max-w-[850px] mx-auto px-4 sm:px-6">
        {/* Onay Kartı */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-xl text-center">
          {/* Başarı İkonu */}
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
            <span className="material-symbols-outlined text-5xl font-bold">
              check_circle
            </span>
          </div>

          {/* Belirgin & Yüksek Kontrastlı Rozet */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-sm">
              <span className="material-symbols-outlined text-sm">verified</span>
              Ödeme Başarıyla Tamamlandı
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Rezervasyonunuz Onaylandı!
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Ödemeniz başarıyla tahsil edildi. Kiralama detaylarınız kaydedildi ve
            aracınız teslimat saatinde hazır edilecektir.
          </p>

          {/* Sipariş Detayları */}
          {order ? (
            <div className="text-left bg-slate-50 rounded-2xl p-5 sm:p-8 border border-slate-200 mb-8 space-y-6">
              {/* Başlık ve Durum */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold">
                    Sipariş Numarası
                  </span>
                  <p className="font-mono text-sm sm:text-base font-bold text-blue-600 mt-0.5">
                    #{order._id}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    {order.status === "paid" ? "ÖDENDİ" : "ONAYLANDI"}
                  </span>
                </div>
              </div>

              {/* Araç Bilgisi */}
              {car && (
                <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
                  <div className="w-full sm:w-48 h-32 relative rounded-xl bg-white overflow-hidden flex items-center justify-center p-2 border border-slate-200 shrink-0 shadow-sm">
                    <img
                      src={visuals?.main || "/placeholder-car.png"}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 w-full text-left">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {car.category || "Kiralık Araç"}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                      {car.brand} {car.model}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {car.transmission} • {car.fuelType} • {car.seatingCapacity} Kişilik • {car.year} Model
                    </p>
                  </div>
                </div>
              )}

              {/* Kiralama Tarih ve Lokasyon Detayları */}
              {order.rental && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase mb-1">
                      <span className="material-symbols-outlined text-base">
                        pin_drop
                      </span>
                      Alış Bilgileri
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      {order.rental.pickupLocation || "Merkez Şube"}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {order.rental.pickupDate}{" "}
                      {order.rental.pickupTime ? `• ${order.rental.pickupTime}` : ""}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase mb-1">
                      <span className="material-symbols-outlined text-base">
                        where_to_vote
                      </span>
                      İade Bilgileri
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      {order.rental.dropoffLocation ||
                        order.rental.pickupLocation ||
                        "Merkez Şube"}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {order.rental.returnDate || order.rental.pickupDate}{" "}
                      {order.rental.returnTime ? `• ${order.rental.returnTime}` : ""}
                    </p>
                  </div>
                </div>
              )}

              {/* Tutar */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <span className="text-sm font-semibold text-slate-600">
                  Toplam Ödenen Tutar:
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {order.totalAmount
                    ? Number(order.totalAmount).toLocaleString("tr-TR")
                    : "0"}{" "}
                  ₺
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8 text-slate-600 text-sm">
              Sipariş bilgileri işleniyor. Rezervasyon özetiniz e-posta adresinize gönderilecektir.
            </div>
          )}

          {/* Butonlar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">home</span>
              Ana Sayfaya Dön
            </Link>
            <Link
              href="/cars"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all border border-slate-300 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">
                directions_car
              </span>
              Diğer Araçları İncele
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
