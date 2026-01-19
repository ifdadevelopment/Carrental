import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import BookingChauffeur from "../models/BookingChauffeur";
import BookingRide from "../models/BookingRide";
import { getAllBookings } from "../services/bookingService";

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const bookingType = body.bookingType || "RIDE";

  const pickupLocation =
    body.pickupLocation ||
    body["pickup-location"] ||   
    body["pickup-suburb"] ||    
    null;

  if (!pickupLocation) {
    return NextResponse.json(
      { success: false, message: "Pickup location is required" },
      { status: 400 }
    );
  }
  let payload = {
    bookingType,

    fullName: body.fullName || body["name"] || body["fullName"],
    email: body.email,
    phone: body.phone || body.phone,

    pickupLocation,
    pickupDate: body.pickupDate || body["pickupDate"],
    pickupTime: body.pickupTime || body["pickupTime"],

    notes: body.notes || body["notes"] || "",
  };
  if (bookingType === "CHAUFFEUR") {
    payload = {
      ...payload,

      dropoffLocation:
        body.dropoffLocation ||
        body.dropoff ||
        body["dropoff"],

      passengers: Number(body.passengers) || 1,
      flightNumber: body.flightNumber || body["flightNumber"] || "",
      tripType: body.tripType || body["tripType"] || "",
    };
  }
  if (bookingType === "RIDE") {
    payload = {
      ...payload,
      returnDate: body.returnDate || body["returnDate"] || null,
    };
  }
  const Model =
    bookingType === "CHAUFFEUR"
      ? BookingChauffeur
      : BookingRide;

  const booking = await Model.create(payload);

  return NextResponse.json(
    { success: true, data: booking },
    { status: 201 }
  );
}
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const bookingType = searchParams.get("bookingType");
  const status = searchParams.get("status");

  const data = await getAllBookings({ bookingType, status });

  return NextResponse.json({ success: true, data });
}
