import mongoose from "mongoose";
import { statusHistorySchema } from "./common/statusHistory.js"; 

const bookingRideSchema = new mongoose.Schema(
  {
    bookingType: {
      type: String,
      default: "RIDE",
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    pickupLocation: {
      type: String,
      required: true,
    },

    pickupDate: {
      type: Date,
      required: true,
    },

    pickupTime: {
      type: String,
      required: true,
    },

    returnDate: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
      index: true,
    },

    remark: {
      type: String,
      default: "",
    },

    statusHistory: {
      type: [statusHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const BookingRide =
  mongoose.models.BookingRide ||
  mongoose.model("BookingRide", bookingRideSchema);

export default BookingRide;
