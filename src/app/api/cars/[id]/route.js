import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectDB from "../../lib/db";
import Car from "../../models/Car.model";
export const runtime = "nodejs";
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/cars");

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;

  const car = await Car.findById(id);
  if (!car) {
    return NextResponse.json(
      { success: false, message: "Car not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: car });
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const formData = await req.formData();
    const car = await Car.findById(id);

    if (!car) {
      return NextResponse.json(
        { success: false, message: "Car not found" },
        { status: 404 }
      );
    }

    const serviceType =
      formData.get("serviceType") ?? car.serviceType;

    /* ---------- IMAGES ---------- */
    const keepImages = formData.getAll("keepImages");
    const newImages = formData.getAll("carImages");

    for (const img of car.carImages) {
      if (!keepImages.includes(img)) {
        const imgPath = path.join(
          process.cwd(),
          "public",
          img.replace(/^\/+/, "")
        );
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }
    }

    const uploadedImages = [];
    for (const image of newImages) {
      if (image?.size > 0) {
        const buffer = Buffer.from(await image.arrayBuffer());
        const safeName = image.name.replace(/\s+/g, "-");
        const filename = `${Date.now()}-${safeName}`;
        fs.writeFileSync(
          path.join(UPLOAD_DIR, filename),
          buffer
        );
        uploadedImages.push(`/uploads/cars/${filename}`);
      }
    }

    car.carImages =
      keepImages.length || uploadedImages.length
        ? [...keepImages, ...uploadedImages]
        : car.carImages;

    /* ---------- BASIC ---------- */
    car.carName = formData.get("carName") ?? car.carName;
    car.serviceType = serviceType;
    car.seater =
      Number(formData.get("seater")) || car.seater;
    car.carDetails =
      formData.get("carDetails") ?? car.carDetails;

    /* ---------- RENTAL ---------- */
    if (serviceType === "RENTAL") {
      const rentalPriceRaw = formData.get("rentalPrice");
      const rentalPrice = Number(rentalPriceRaw);
      const category = formData.get("category");
      const amenities = formData
        .getAll("amenities")
        .filter(Boolean);

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
              "Rental cars require price, category, and amenities",
          },
          { status: 400 }
        );
      }

      car.rentalPrice = rentalPrice;
      car.category = category;
      car.amenities = amenities;
    } else {
      car.rentalPrice = undefined;
      car.category = undefined;
      car.amenities = undefined;
    }

    await car.save();

    return NextResponse.json({
      success: true,
      message: "Car updated successfully",
      data: car,
    });
  } catch (error) {
    console.error("UPDATE CAR ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}



export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const car = await Car.findById(id);
    if (!car) {
      return NextResponse.json(
        { success: false, message: "Car not found" },
        { status: 404 }
      );
    }
    for (const img of car.carImages || []) {
      const imgPath = path.join(
        process.cwd(),
        "public",
        img.replace(/^\/+/, "")
      );

      if (fs.existsSync(imgPath)) {
        try {
          fs.unlinkSync(imgPath);
        } catch (err) {
          console.error("Image delete failed:", imgPath, err);
        }
      }
    }

    await car.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Car and related images deleted successfully",
    });
  } catch (error) {
    console.error("DELETE CAR ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
