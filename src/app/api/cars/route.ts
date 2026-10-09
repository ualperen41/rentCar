import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    // Query parameters
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "8", 10));
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category"); // can be comma-separated or single
    const capacity = searchParams.get("capacity"); // e.g. "2,4,7"
    const maxPrice = searchParams.get("maxPrice");
    const transmission = searchParams.get("transmission"); // "Automatic", "Manual"
    const fuelType = searchParams.get("fuelType"); // "Petrol", "Diesel", "Electric", "Hybrid"
    const sortBy = searchParams.get("sortBy") || "popular"; // "popular", "price_asc", "price_desc", "newest"
    const isPopular = searchParams.get("isPopular");
    const isRecommended = searchParams.get("isRecommended");

    // Build filter query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = { availability: true };

    if (search.trim()) {
      filter.$or = [
        { brand: { $regex: search.trim(), $options: "i" } },
        { model: { $regex: search.trim(), $options: "i" } },
      ];
    }

    if (category) {
      const categories = category.split(",").map((c) => c.trim());
      if (categories.length > 0) {
        filter.category = { $in: categories };
      }
    }

    if (capacity) {
      const capacities = capacity.split(",").map((c) => parseInt(c.trim(), 10)).filter(Boolean);
      if (capacities.length > 0) {
        filter.seatingCapacity = { $in: capacities };
      }
    }

    if (maxPrice) {
      const priceNum = parseFloat(maxPrice);
      if (!isNaN(priceNum) && priceNum > 0) {
        filter.dailyPrice = { $lte: priceNum };
      }
    }

    if (transmission) {
      const transmissions = transmission.split(",").map((t) => t.trim());
      if (transmissions.length > 0) {
        filter.transmission = { $in: transmissions };
      }
    }

    if (fuelType) {
      const fuelTypes = fuelType.split(",").map((f) => f.trim());
      if (fuelTypes.length > 0) {
        filter.fuelType = { $in: fuelTypes };
      }
    }

    if (isPopular === "true") {
      filter.isPopular = true;
    }

    if (isRecommended === "true") {
      filter.isRecommended = true;
    }

    // Build sort options
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sortOptions: Record<string, any> = { createdAt: -1 };

    switch (sortBy) {
      case "price_asc":
        sortOptions = { dailyPrice: 1 };
        break;
      case "price_desc":
        sortOptions = { dailyPrice: -1 };
        break;
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "popular":
      default:
        sortOptions = { isPopular: -1, rating: -1, reviewsCount: -1 };
        break;
    }

    const skip = (page - 1) * limit;

    const [totalCars, cars] = await Promise.all([
      Car.countDocuments(filter),
      Car.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const totalPages = Math.ceil(totalCars / limit);

    return NextResponse.json({
      success: true,
      data: cars,
      pagination: {
        page,
        limit,
        totalCars,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error("Get Cars Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch vehicle fleet." },
      { status: 500 }
    );
  }
}
