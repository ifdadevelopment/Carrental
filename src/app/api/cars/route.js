import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectDB from "../lib/db";
import Car from "../models/Car.model";
export const runtime = "nodejs";
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/cars");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/* ================= CREATE CAR ================= */
export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const serviceType = formData.get("serviceType");

    /* ---------- Images ---------- */
    const images = formData.getAll("carImages");
    if (!images.length || images[0].size === 0) {
      return NextResponse.json(
        { success: false, message: "Car image is required" },
        { status: 400 }
      );
    }

    const imagePaths = [];
    for (const image of images) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const safeName = image.name.replace(/\s+/g, "-");
      const filename = `${Date.now()}-${safeName}`;
      fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);
      imagePaths.push(`/uploads/cars/${filename}`);
    }

    /* ---------- BASE DATA ---------- */
    const carData = {
      carName: formData.get("carName"),
      serviceType,
      seater: Number(formData.get("seater")),
      carDetails: formData.get("carDetails"),
      carImages: imagePaths,
    };

    /* ---------- RENTAL ONLY ---------- */
    if (serviceType === "RENTAL") {
      const rentalPriceRaw = formData.get("rentalPrice");
      const rentalPrice = Number(rentalPriceRaw);
      const category = formData.get("category");
      const amenities = formData.getAll("amenities").filter(Boolean);

      if (
        !rentalPriceRaw ||
        Number.isNaN(rentalPrice) ||
        rentalPrice <= 0 ||
        !category ||
        amenities.length === 0
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Rental cars require valid price, category and amenities",
          },
          { status: 400 }
        );
      }

      carData.rentalPrice = rentalPrice;
      carData.category = category;
      carData.amenities = amenities;
    }

    const car = await Car.create(carData);

    return NextResponse.json({
      success: true,
      message: "Car added successfully",
      data: car,
    });
  } catch (error) {
    console.error("CREATE CAR ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const filter = {};
  if (category) {
    filter.category = category;
    filter.serviceType = "RENTAL";
  }

  const cars = await Car.find(filter).sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    data: cars,
  });
}
