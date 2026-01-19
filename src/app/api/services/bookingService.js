import connectDB from "../lib/db";
import BookingChauffeur from "../models/BookingChauffeur";
import BookingRide from "../models/BookingRide";


export async function getAllBookings({ bookingType, status }) {
  await connectDB();

  const filter = {};
  if (status) filter.status = status;

  let data = [];

  if (!bookingType || bookingType === "RIDE") {
    data = data.concat(
      await BookingRide.find(filter).lean()
    );
  }

  if (!bookingType || bookingType === "CHAUFFEUR") {
    data = data.concat(
      await BookingChauffeur.find(filter).lean()
    );
  }

  return data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}
