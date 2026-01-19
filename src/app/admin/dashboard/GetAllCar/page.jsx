"use client";

import EditCarModal from "@/app/(site)/components/EditCarModal";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const PAGE_SIZE = 10;

export default function BookingHire() {
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(cars.length / PAGE_SIZE);

  const paginatedCars = cars.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cars");
      const json = await res.json();
      setCars(json.data || []);
    } catch {
      alert("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this car?")) return;

    try {
      await fetch(`/api/cars/${id}`, { method: "DELETE" });

      const updated = cars.filter((c) => c._id !== id);
      setCars(updated);

      const newTotalPages = Math.ceil(updated.length / PAGE_SIZE);
      if (page > newTotalPages) {
        setPage(Math.max(newTotalPages, 1));
      }
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Booking Hire</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="text-left">Name</th>
              <th className="text-left">Description</th>
              <th className="text-center">Service</th>
              <th className="text-center">Category</th>
              <th className="text-center">Seater</th>
              <th className="text-center">Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : paginatedCars.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-6 text-center">
                  No cars found
                </td>
              </tr>
            ) : (
              paginatedCars.map((car) => (
                <tr
                  key={car._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">
                    <img
                      src={car.carImages?.[0] || "/placeholder.png"}
                      alt={car.carName}
                      className="w-20 h-14 object-cover rounded-md"
                    />
                  </td>

                  <td className="font-medium">
                    {car.carName}
                  </td>

                  <td className="text-gray-600 max-w-[260px]">
                    {car.carDetails
                      ? car.carDetails.slice(0, 60) + "…"
                      : "-"}
                  </td>

                  <td className="text-center">
                    {car.serviceType}
                  </td>
                  <td className="text-center">
                    {car.serviceType === "RENTAL"
                      ? car.category || "—"
                      : "—"}
                  </td>

                  <td className="text-center">
                    {car.seater}
                  </td>
                  <td className="text-center font-semibold">
                    {car.serviceType === "RENTAL"
                      ? `$${car.rentalPrice}`
                      : "—"}
                  </td>

                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setSelectedCar(car)}
                        className="p-2 bg-blue-600 text-white
                        rounded hover:bg-blue-700"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleDelete(car._id)}
                        className="p-2 bg-red-600 text-white
                        rounded hover:bg-red-700"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {selectedCar && (
        <EditCarModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onUpdated={async () => {
            setSelectedCar(null);
            await fetchCars();
          }}
        />
      )}
    </div>
  );
}
