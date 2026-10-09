"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CarReservationFormProps {
  car: {
    _id: string;
    brand: string;
    model: string;
    dailyPrice: number;
    discountPrice?: number | null;
    category?: string;
  };
}

export default function CarReservationForm({ car }: CarReservationFormProps) {
  const router = useRouter();

  // Initial dates: tomorrow and 3 days later
  const today = new Date();
  const initialStart = new Date(today);
  initialStart.setDate(today.getDate() + 1);
  const initialEnd = new Date(today);
  initialEnd.setDate(today.getDate() + 4);

  const [pickupLocation, setPickupLocation] = useState("İstanbul - Beşiktaş");
  const [pickupDate, setPickupDate] = useState(initialStart.toISOString().split("T")[0]);
  const [pickupTime, setPickupTime] = useState("10:00");

  const [isDifferentReturn, setIsDifferentReturn] = useState(false);
  const [returnLocation, setReturnLocation] = useState("İstanbul - Kadıköy");
  const [returnDate, setReturnDate] = useState(initialEnd.toISOString().split("T")[0]);
  const [returnTime, setReturnTime] = useState("10:00");

  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const turkeyLocations = [
    "İstanbul - Beşiktaş",
    "İstanbul - Kadıköy",
    "İstanbul - Levent",
    "İstanbul - Sarıyer",
    "İstanbul - Havalimanı VIP Karşılama",
    "Ankara - Çankaya",
    "İzmir - Alsancak",
    "Antalya - Muratpaşa",
    "Muğla - Bodrum Marina",
    "Bursa - Nilüfer",
    "Özel Adrese / Otele Vale Teslimatı",
  ];

  // Calculate rental duration in days
  const startDateObj = new Date(pickupDate);
  const endDateObj = new Date(returnDate);
  const diffTime = endDateObj.getTime() - startDateObj.getTime();
  const rawDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const rentalDays = rawDays > 0 ? rawDays : 1;

  // Financial calculations
  const pricePerDay = car.dailyPrice;
  const subtotal = pricePerDay * rentalDays;
  const tax = subtotal * 0.20; // %20 KDV
  const totalAmount = subtotal + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      carId: car._id,
      carBrand: car.brand,
      carModel: car.model,
      dailyPrice: pricePerDay,
      pickupLocation,
      pickupDate,
      pickupTime,
      returnLocation: isDifferentReturn ? returnLocation : pickupLocation,
      returnDate,
      returnTime,
      rentalDays,
      subtotal,
      tax,
      totalAmount,
      notes,
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.message || data?.error || `Checkout isteği başarısız oldu (HTTP ${res.status})`
        );
      }

      setSuccess("Rezervasyon talebiniz alındı, yönlendiriliyorsunuz...");

      // If backend returns a redirect URL (e.g. payment gateway or success page)
      if (data?.url) {
        window.location.href = data.url;
      } else if (data?.redirectUrl) {
        router.push(data.redirectUrl);
      }
    } catch (err: any) {
      setError(err?.message || "Checkout isteği gönderilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pt-4 border-t border-outline-variant/20 mt-4">
      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-base shrink-0">error</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-base shrink-0">check_circle</span>
          <span>{success}</span>
        </div>
      )}

      {/* Pick-Up Section */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-bold text-on-surface">
          <span className="w-2 h-2 rounded-full bg-primary" />
          Alış Noktası &amp; Teslimat Konumu
        </label>
        <div className="relative">
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full bg-surface-container-low text-on-surface rounded-xl px-3.5 py-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer border border-outline-variant/20"
            required
          >
            {turkeyLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none text-lg">
            expand_more
          </span>
        </div>
      </div>

      {/* Pick-Up Date & Time */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-on-surface-variant">
            Alış Tarihi
          </label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full bg-surface-container-low text-on-surface rounded-xl px-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-primary border border-outline-variant/20"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-on-surface-variant">
            Alış Saati
          </label>
          <select
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full bg-surface-container-low text-on-surface rounded-xl px-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-primary border border-outline-variant/20 cursor-pointer"
          >
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="12:00">12:00</option>
            <option value="14:00">14:00</option>
            <option value="16:00">16:00</option>
            <option value="18:00">18:00</option>
            <option value="20:00">20:00</option>
          </select>
        </div>
      </div>

      {/* Return Location Toggle & Select */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs font-bold text-on-surface">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            İade Noktası
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-on-surface-variant">
            <input
              type="checkbox"
              checked={isDifferentReturn}
              onChange={(e) => setIsDifferentReturn(e.target.checked)}
              className="rounded text-primary focus:ring-primary"
            />
            <span>Farklı noktada iade</span>
          </label>
        </div>

        {isDifferentReturn && (
          <div className="relative animate-fadeIn">
            <select
              value={returnLocation}
              onChange={(e) => setReturnLocation(e.target.value)}
              className="w-full bg-surface-container-low text-on-surface rounded-xl px-3.5 py-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer border border-outline-variant/20"
            >
              {turkeyLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none text-lg">
              expand_more
            </span>
          </div>
        )}
      </div>

      {/* Return Date & Time */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-on-surface-variant">
            İade Tarihi
          </label>
          <input
            type="date"
            value={returnDate}
            min={pickupDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full bg-surface-container-low text-on-surface rounded-xl px-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-primary border border-outline-variant/20"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-on-surface-variant">
            İade Saati
          </label>
          <select
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            className="w-full bg-surface-container-low text-on-surface rounded-xl px-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-primary border border-outline-variant/20 cursor-pointer"
          >
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="12:00">12:00</option>
            <option value="14:00">14:00</option>
            <option value="16:00">16:00</option>
            <option value="18:00">18:00</option>
            <option value="20:00">20:00</option>
          </select>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-on-surface-variant">
          Özel Talepler ve Notlar (Opsiyonel)
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Uçuş kodu, vale teslimat saati, ek donanım talepleri..."
          className="w-full bg-surface-container-low text-on-surface rounded-xl p-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-outline border border-outline-variant/20"
        />
      </div>

      {/* Real-Time Price Breakdown */}
      <div className="bg-surface-container-low/60 rounded-xl p-3.5 space-y-2 text-xs border border-outline-variant/10">
        <div className="flex items-center justify-between text-on-surface-variant">
          <span>Kiralama Ücreti (₺{pricePerDay.toLocaleString("tr-TR")} × {rentalDays} gün)</span>
          <span className="font-mono font-medium text-on-surface">₺{subtotal.toLocaleString("tr-TR")}</span>
        </div>
        <div className="flex items-center justify-between text-on-surface-variant">
          <span>Vale &amp; Konsiyerj Hizmeti</span>
          <span className="text-primary font-bold">ÜCRETSİZ (₺0)</span>
        </div>
        <div className="flex items-center justify-between text-on-surface-variant">
          <span>KDV (%20)</span>
          <span className="font-mono font-medium text-on-surface">₺{tax.toLocaleString("tr-TR")}</span>
        </div>
        <div className="flex items-baseline justify-between pt-2 border-t border-outline-variant/20 font-bold">
          <span className="text-on-surface">Tahmini Toplam Tutar</span>
          <span className="text-base text-primary font-mono">₺{totalAmount.toLocaleString("tr-TR")}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
            <span>İşlem Yapılıyor...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-base">lock</span>
            <span>Hemen Kirala • Ödemeye Geç</span>
          </>
        )}
      </button>
    </form>
  );
}
