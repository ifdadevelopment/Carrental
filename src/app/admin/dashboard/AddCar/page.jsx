"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CarForm() {
  const [formData, setFormData] = useState({
    carName: "",
    serviceType: "",
    seater: "",
    rentalPrice: "",
    category: "",
    amenities: "",
    carDetails: "",
    carImages: [],
  });

  const [previews, setPreviews] = useState([]);
  const isRental = formData.serviceType === "RENTAL";

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const filesArray = Array.from(files);
      setFormData((p) => ({ ...p, carImages: filesArray }));
      setPreviews(filesArray.map((f) => URL.createObjectURL(f)));
      return;
    }

    if (name === "serviceType") {
      setFormData((p) => ({
        ...p,
        serviceType: value,
        rentalPrice: value === "RENTAL" ? p.rentalPrice : "",
        category: value === "RENTAL" ? p.category : "",
        amenities: value === "RENTAL" ? p.amenities : "",
      }));
      return;
    }

    setFormData((p) => ({ ...p, [name]: value }));
  };


  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.carImages.length) {
      toast.error("Car image is required");
      return;
    }

    if (
      isRental &&
      (!formData.rentalPrice || !formData.category)
    ) {
      toast.error("Rental price & category required");
      return;
    }

    const data = new FormData();

    data.append("carName", formData.carName);
    data.append("serviceType", formData.serviceType);
    data.append("seater", Number(formData.seater));
    data.append("carDetails", formData.carDetails);

    if (isRental) {
      data.append("rentalPrice", Number(formData.rentalPrice));
      data.append("category", formData.category);

      formData.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)
        .forEach((a) => data.append("amenities", a));
    }

    formData.carImages.forEach((img) =>
      data.append("carImages", img)
    );

    const loading = toast.loading("Adding car...");

    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        body: data,
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.message || "Failed", { id: loading });
        return;
      }

      toast.success("Car added successfully 🚗", { id: loading });

      // reset
      setFormData({
        carName: "",
        serviceType: "",
        seater: "",
        rentalPrice: "",
        category: "",
        amenities: "",
        carDetails: "",
        carImages: [],
      });
      setPreviews([]);
    } catch {
      toast.error("Something went wrong", { id: loading });
    }
  };


  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <h2 className="text-2xl font-semibold text-blue-600">
          Add Car
        </h2>

        <FloatingInput
          label="Car Name"
          name="carName"
          value={formData.carName}
          onChange={handleChange}
          required
        />

        <div className="relative">
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="peer w-full border rounded-xl px-3 pt-6 pb-2"
          >
            <option value="" disabled />
            <option value="CHAUFFERS">Chauffeurs</option>
            <option value="RENTAL">Rental</option>
          </select>
          <FloatingLabel text="Service Type" />
        </div>

        <FloatingInput
          label="Seater"
          name="seater"
          type="number"
          value={formData.seater}
          onChange={handleChange}
          required
        />
        {isRental && (
          <>
            <FloatingInput
              label="Rental Price"
              name="rentalPrice"
              type="number"
              value={formData.rentalPrice}
              onChange={handleChange}
              required
            />

            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="peer w-full border rounded-xl px-3 pt-6 pb-2"
              >
                <option value="" disabled />
                <option value="Car">Car</option>
                <option value="SUV">SUV</option>
                <option value="Premium">Premium</option>
                <option value="Van">Van</option>
                <option value="Truck">Truck</option>
              </select>
              <FloatingLabel text="Category" />
            </div>

            <FloatingInput
              label="Amenities (comma separated)"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
            />
          </>
        )}

        <div className="relative">
          <textarea
            name="carDetails"
            rows={3}
            value={formData.carDetails}
            onChange={handleChange}
            required
            placeholder=" "
            className="peer w-full border rounded-xl px-3 pt-6 pb-2 resize-none"
          />
          <FloatingLabel text="Car Details" />
        </div>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
        />

        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                className="h-20 object-cover rounded"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
function FloatingInput({ label, ...props }) {
  return (
    <div className="relative">
      <input
        {...props}
        placeholder=" "
        className="peer w-full border rounded-xl px-3 pt-6 pb-2"
      />
      <FloatingLabel text={label} />
    </div>
  );
}

function FloatingLabel({ text }) {
  return (
    <label className="absolute left-3 top-2 text-xs text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs transition-all">
      {text}
    </label>
  );
}
