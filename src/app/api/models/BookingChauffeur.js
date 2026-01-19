import mongoose from "mongoose";
import { statusHistorySchema } from "./common/statusHistory.js";

const bookingChauffeurSchema = new mongoose.Schema(
  {
    bookingType: {
      type: String,
      default: "CHAUFFEUR",
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
      trim: true,
    },

    dropoffLocation: {
      type: String,
      required: true,
      trim: true,
    },

    passengers: {
      type: Number,
      required: true,
      min: 1,
    },

    flightNumber: {
      type: String,
      trim: true,
      default: "",
    },

    pickupDate: {
      type: Date,
      required: true,
    },

    pickupTime: {
      type: String,
      required: true,
    },

    tripType: { type: String },

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

const BookingChauffeur =
  mongoose.models.BookingChauffeur ||
  mongoose.model("BookingChauffeur", bookingChauffeurSchema);

export default BookingChauffeur;
