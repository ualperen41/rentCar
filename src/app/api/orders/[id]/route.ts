import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Stripe from "stripe";
import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import "@/models/Car"; // Populate için model kaydının hazır bulunmasını garanti eder

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Geçersiz sipariş ID" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const orderDoc = await Order.findById(id).populate("car");

    if (!orderDoc) {
      return NextResponse.json(
        { success: false, message: "Sipariş bulunamadı" },
        { status: 404 }
      );
    }

    // Webhook gecikmesine karşılık Stripe üzerinden ödeme durumunu teyit et
    if (orderDoc.status !== "paid" && orderDoc.stripeSessionId) {
      try {
        const stripeSession = await stripe.checkout.sessions.retrieve(
          orderDoc.stripeSessionId
        );
        if (stripeSession.payment_status === "paid") {
          orderDoc.status = "paid";
          await orderDoc.save();
        }
      } catch (stripeErr) {
        console.error("Stripe session doğrulama hatası:", stripeErr);
      }
    }

    return NextResponse.json({
      success: true,
      order: orderDoc,
    });
  } catch (error: any) {
    console.error("Sipariş getirme hatası:", error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Geçersiz sipariş ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    await connectToDatabase();

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Sipariş bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error: any) {
    console.error("Sipariş güncelleme hatası:", error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası", error: error.message },
      { status: 500 }
    );
  }
}
