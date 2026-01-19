import mongoose from "mongoose";

const bookingRideSchema = new mongoose.Schema(
  {
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
    formHeading: {
      type: String,
      default: "Book Your Ride",
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    remark: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.BookingRide ||
  mongoose.model("BookingRide", bookingRideSchema);
