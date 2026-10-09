import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICar {
  _id?: string;
  brand: string;
  model: string;
  year: number;
  category: "Sport" | "SUV" | "MPV" | "Sedan" | "Coupe" | "Hatchback" | "Electric";
  transmission: "Manuel" | "Otomatik" | "Manual" | "Automatic";
  fuelType: "Benzin" | "Dizel" | "Elektrik" | "Hibrit" | "Petrol" | "Diesel" | "Electric" | "Hybrid";
  tankCapacity: string; // e.g. "90L" or "100kWh"
  seatingCapacity: number; // 2, 4, 5, 7, etc.
  dailyPrice: number;
  discountPrice?: number | null;
  features: string[];
  availability: boolean;
  rating: number;
  reviewsCount: number;
  description?: string;
  isPopular?: boolean;
  isRecommended?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const CarSchema = new Schema<ICar>(
  {
    brand: {
      type: String,
      required: [true, "Araç markası zorunludur"],
      trim: true,
      index: true,
    },
    model: {
      type: String,
      required: [true, "Araç modeli zorunludur"],
      trim: true,
      index: true,
    },
    year: {
      type: Number,
      required: [true, "Model yılı zorunludur"],
    },
    category: {
      type: String,
      enum: ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback", "Electric"],
      required: [true, "Araç kategorisi zorunludur"],
      index: true,
    },
    transmission: {
      type: String,
      enum: ["Manuel", "Otomatik", "Manual", "Automatic"],
      required: [true, "Vites türü zorunludur"],
      index: true,
    },
    fuelType: {
      type: String,
      enum: ["Benzin", "Dizel", "Elektrik", "Hibrit", "Petrol", "Diesel", "Electric", "Hybrid"],
      required: [true, "Yakıt türü zorunludur"],
      index: true,
    },
    tankCapacity: {
      type: String,
      required: [true, "Depo veya batarya kapasitesi zorunludur"],
    },
    seatingCapacity: {
      type: Number,
      required: [true, "Koltuk kapasitesi zorunludur"],
      min: 1,
      max: 12,
      index: true,
    },
    dailyPrice: {
      type: Number,
      required: [true, "Günlük kiralama ücreti zorunludur"],
      min: 0,
      index: true,
    },
    discountPrice: {
      type: Number,
      default: null,
    },
    features: {
      type: [String],
      default: [],
    },
    availability: {
      type: Boolean,
      default: true,
      index: true,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    isPopular: {
      type: Boolean,
      default: false,
      index: true,
    },
    isRecommended: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound text index for fast search by brand and model
CarSchema.index({ brand: "text", model: "text" });

const Car: Model<ICar> =
  mongoose.models.Car || mongoose.model<ICar>("Car", CarSchema);

export default Car;
