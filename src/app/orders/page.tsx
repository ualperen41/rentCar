"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCarVisuals } from "@/lib/carImages";

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  pending: { label: "Ödeme Bekleniyor", className: "bg-amber-50 text-amber-700 border-amber-300" },
  paid: { label: "Ödendi", className: "bg-emerald-50 text-emerald-700 border-emerald-300" },
  completed: { label: "Tamamlandı", className: "bg-blue-50 text-blue-700 border-blue-300" },
  cancelled: { label: "İptal Edildi", className: "bg-red-50 text-red-700 border-red-300" },
};

export default function OrdersPage() {
  const { status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status !== "authenticated") return;

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Siparişler alınamadı");
        }
        setOrders(data.orders);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [status, router]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="w-full pt-28 pb-16 max-w-[1000px] mx-auto px-4 sm:px-6 flex-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">Siparişlerim</h1>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-36 rounded-2xl bg-white border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-sm">{error}</div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center">
            <span className="material-symbols-outlined text-5xl text-slate-400">receipt_long</span>
            <p className="text-slate-600 mt-3 mb-6">Henüz bir siparişiniz bulunmuyor.</p>
            <Link
              href="/cars"
              className="inline-flex px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all"
            >
              Araçları İncele
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const car = order.car;
              const visuals = car ? getCarVisuals(car.brand, car.model, car.year, car.fuelType) : null;
              const statusInfo = STATUS_STYLES[order.status] || STATUS_STYLES.pending;

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-5"
                >
                  <div className="w-full sm:w-44 h-28 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 shrink-0">
                    <img
                      src={visuals?.main || "/placeholder-car.png"}
                      alt={car ? `${car.brand} ${car.model}` : "Araç"}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h2 className="text-lg font-bold">
                          {car ? `${car.brand} ${car.model}` : "Araç bilgisi bulunamadı"}
                        </h2>
                        <p className="font-mono text-xs text-slate-500 mt-0.5">#{order._id}</p>
                      </div>
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${statusInfo.className}`}
                      >
                        {statusInfo.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm text-slate-600">
                      <p>
                        <span className="font-semibold text-slate-800">Alış: </span>
                        {order.rental?.pickupLocation || "Merkez Şube"} • {order.rental?.pickupDate}
                        {order.rental?.pickupTime ? ` ${order.rental.pickupTime}` : ""}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-800">İade: </span>
                        {order.rental?.dropoffLocation || order.rental?.pickupLocation || "Merkez Şube"} •{" "}
                        {order.rental?.returnDate || order.rental?.pickupDate}
                        {order.rental?.returnTime ? ` ${order.rental.returnTime}` : ""}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                        {order.rental?.days ? ` • ${order.rental.days} gün` : ""}
                      </span>
                      <span className="text-xl font-black">
                        {Number(order.totalAmount || 0).toLocaleString("tr-TR")} ₺
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
