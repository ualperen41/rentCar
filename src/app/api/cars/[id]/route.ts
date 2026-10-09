import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid vehicle ID format." },
        { status: 400 }
      );
    }

    await connectDB();

    const car = await Car.findById(id).lean();

    if (!car) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: car,
    });
  } catch (error) {
    console.error("Get Single Car Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve vehicle details." },
      { status: 500 }
    );
  }
}
