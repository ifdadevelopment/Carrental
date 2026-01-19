import fs from "fs";
import path from "path";
import Car from "../models/Car.model.js";

export const createCar = async (req, res) => {
  try {
    const {
      carName,
      serviceType,
      seater,
      rentalPrice,
      category,
      amenities,
      carDetails,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one car image is required",
      });
    }

    if (
      serviceType === "RENTAL" &&
      (!rentalPrice || !category || !amenities?.length)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Rental cars require price, category, and amenities",
      });
    }

    const imagePaths = req.files.map(
      (file) => `/uploads/cars/${file.filename}`
    );

    const car = await Car.create({
      carName,
      serviceType,
      seater,
      rentalPrice:
        serviceType === "RENTAL" ? Number(rentalPrice) : undefined,
      category:
        serviceType === "RENTAL" ? category : undefined,
      amenities:
        serviceType === "RENTAL"
          ? Array.isArray(amenities)
            ? amenities
            : amenities.split(",").map((a) => a.trim())
          : undefined,
      carDetails,
      carImages: imagePaths,
    });

    res.status(201).json({
      success: true,
      message: "Car added successfully",
      data: car,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllCars = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};
    if (category) {
      filter.category = category;
      filter.serviceType = "RENTAL";
    }

    const cars = await Car.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.status(200).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }
    if (req.files?.length) {
      car.carImages.forEach((img) => {
        const imgPath = path.resolve(`.${img}`);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });

      car.carImages = req.files.map(
        (file) => `/uploads/cars/${file.filename}`
      );
    }
    car.carName = req.body.carName ?? car.carName;
    car.serviceType = req.body.serviceType ?? car.serviceType;
    car.seater = Number(req.body.seater) || car.seater;
    car.carDetails = req.body.carDetails ?? car.carDetails;
    if (car.serviceType === "RENTAL") {
      const rentalPrice = Number(req.body.rentalPrice);
      const category = req.body.category;
      const amenities = req.body.amenities
        ? Array.isArray(req.body.amenities)
          ? req.body.amenities
          : req.body.amenities
              .split(",")
              .map((a) => a.trim())
        : [];

      if (
        !rentalPrice ||
        Number.isNaN(rentalPrice) ||
        !category ||
        !amenities.length
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Rental cars require price, category, and amenities",
        });
      }

      car.rentalPrice = rentalPrice;
      car.category = category;
      car.amenities = amenities;
    } else {
      car.rentalPrice = undefined;
      car.category = undefined;
      car.amenities = undefined;
    }

    await car.save();

    res.status(200).json({
      success: true,
      message: "Car updated successfully",
      data: car,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    // delete all images
    car.carImages.forEach((img) => {
      const imgPath = path.resolve(`.${img}`);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });

    await car.deleteOne();

    res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
