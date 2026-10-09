import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/db";
import { auth } from "@/lib/auth";
import Order from "@/models/Order";
import User from "@/models/User";
import "@/models/Car"; // Populate için model kaydının hazır bulunmasını garanti eder

// GET /api/orders -> oturumdaki kullanıcıya ait siparişleri döner
export async function GET() {
  try {
    // kullanıcının oturum verisini al
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Kullanıcı ID'sini doğrula; oturumda geçerli ObjectId yoksa (örn. Google girişi) e-posta ile bul
    let userId = (session.user as { id?: string }).id;
    if ((!userId || !mongoose.Types.ObjectId.isValid(userId)) && session.user.email) {
      const dbUser = await User.findOne({
        email: session.user.email.toLowerCase().trim(),
      });
      userId = dbUser?._id.toString();
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // kullanıcının siparişlerini en yeniden eskiye sırala, araç bilgisini ekle
    const orders = await Order.find({ user: userId })
      .populate("car")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error("Siparişleri getirme hatası:", error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası", error: error.message },
      { status: 500 }
    );
  }
}
