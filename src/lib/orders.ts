import { IOrder } from "./types";

/**
 * Sunucu veya istemci ortamında geçerli baseUrl değerini döndürür.
 */
export function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return (
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000"
  );
}

/**
 * Belirtilen orderId'ye sahip siparişi API endpoint'inden getirir.
 */
export async function getOrder(orderId: string): Promise<IOrder | null> {
  if (!orderId) return null;

  const baseUrl = getBaseUrl();

  try {
    const res = await fetch(`${baseUrl}/api/orders/${orderId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Sipariş API yanıt hatası (${res.status}): ${orderId}`);
      return null;
    }

    const data = await res.json();
    return data?.success ? (data.order as IOrder) : null;
  } catch (error) {
    console.error("getOrder API isteği hatası:", error);
    return null;
  }
}

/**
 * Sipariş durumunu günceller.
 */
export async function updateOrderStatus(
  orderId: string,
  status: "pending" | "paid" | "cancelled" | "completed"
): Promise<IOrder | null> {
  if (!orderId) return null;

  const baseUrl = getBaseUrl();

  try {
    const res = await fetch(`${baseUrl}/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Sipariş durum güncelleme hatası (${res.status}): ${orderId}`);
      return null;
    }

    const data = await res.json();
    return data?.success ? (data.order as IOrder) : null;
  } catch (error) {
    console.error("updateOrderStatus API isteği hatası:", error);
    return null;
  }
}

/**
 * Siparişi iptal durumuna çeker.
 */
export async function cancelOrder(orderId: string): Promise<IOrder | null> {
  return updateOrderStatus(orderId, "cancelled");
}
