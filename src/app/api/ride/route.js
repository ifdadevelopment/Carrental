import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import BookingRide from "../models/BookingRide";


export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const ride = await BookingRide.create({
      ...body,
      pickupDate: new Date(body.pickupDate),
      returnDate: body.returnDate ? new Date(body.returnDate) : null,
    });

    return NextResponse.json(
      { success: true, data: ride },
      { status: 201 }
    );
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const rides = await BookingRide.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: rides },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
