import mongoose from "mongoose";

export const statusHistorySchema = new mongoose.Schema(
  {
    status: String,
    remark: String,
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);
