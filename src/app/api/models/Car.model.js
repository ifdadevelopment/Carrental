import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    carName: { type: String, required: true, trim: true },

    serviceType: {
      type: String,
      enum: ["CHAUFFERS", "RENTAL"],
      required: true,
    },

    seater: { type: Number, required: true, min: 1 },

    rentalPrice: {
      type: Number,
      required: function () {
        return this.serviceType === "RENTAL";
      },
    },

    category: {
      type: String,
      enum: ["Car", "SUV", "Premium", "Van", "Truck"],
      required: function () {
        return this.serviceType === "RENTAL";
      },
    },

    amenities: {
      type: [String],
      required: function () {
        return this.serviceType === "RENTAL";
      },
      default: undefined,
    },

    carDetails: { type: String, required: true },

    carImages: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "At least one car image is required",
      },
    },
  },
  { timestamps: true }
);
carSchema.pre("save", function () {
  if (this.serviceType === "CHAUFFERS") {
    this.rentalPrice = undefined;
    this.category = undefined;
    this.amenities = undefined;
  }
});

const Car =
  mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;
