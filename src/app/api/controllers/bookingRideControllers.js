import connectDB from "../lib/db";
import BookingRide from "../models/BookingRide";

export async function createRide(data) {
  await connectDB();
  return BookingRide.create(data);
}

export async function getAllRides() {
  await connectDB();
  return BookingRide.find().sort({ createdAt: -1 });
}
