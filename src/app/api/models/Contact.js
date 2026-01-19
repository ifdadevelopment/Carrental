import mongoose from "mongoose";

const statusHistorySchema = new mongoose.Schema(
  {
    status: String,
    remark: String,
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const contactSchema = new mongoose.Schema(
  {
    formHeading: { type: String, default: "Contact Near Me" },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    serviceType: { type: String, default: "Car Hire" },
    message: { type: String, trim: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    remark: { type: String, default: "" },
    statusHistory: {
      type: [statusHistorySchema],
      default: [],
    },

    source: { type: String, default: "Website" },
  },
  { timestamps: true }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", contactSchema);
