import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { cancelOrder } from "@/lib/orders";

export const dynamic = "force-dynamic";

interface CancelPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function CancelPage({ searchParams }: CancelPageProps) {
  const { orderId } = await searchParams;

  if (orderId) {
    await cancelOrder(orderId);
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="w-full pt-28 pb-16 max-w-[700px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center">
          {/* İptal İkonu */}
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-50 border-2 border-rose-400 flex items-center justify-center text-rose-500 mb-6 shadow-sm">
            <span className="material-symbols-outlined text-5xl">cancel</span>
          </div>

          {/* Belirgin Rozet */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-600 text-white shadow-sm">
              <span className="material-symbols-outlined text-sm">info</span>
              Ödeme Tamamlanmadı
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Ödeme İşlemi İptal Edildi
          </h1>
          <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Ödeme adımından çıkış yaptınız veya işlem iptal edildi. Hesabınızdan
            herhangi bir ücret tahsil edilmemiştir.
          </p>

          {orderId && (
            <div className="inline-block bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-500 mb-8 font-mono">
              İptal Edilen Sipariş ID: #{orderId}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/cars"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">
                directions_car
              </span>
              Araçları Görüntüle
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all border border-slate-300 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">home</span>
              Ana Sayfa
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
