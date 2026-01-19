import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    formHeading: {
      type: String,
      default: "Contact Near Me",
    },

    name: {
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
      trim: true,
    },

    serviceType: {
      type: String,
      default: "Car Hire",
    },

    message: {
      type: String,
      trim: true,
    },

    source: {
      type: String,
      default: "Website",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", contactSchema);
