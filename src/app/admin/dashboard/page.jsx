"use client";

import { useEffect, useMemo, useState } from "react";

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"];

function StatCard({ title, value, sub }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold  text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      {sub ? <p className="mt-1 text-xs font-medium text-gray-500">{sub}</p> : null}
    </div>
  );
}

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [bRes, cRes] = await Promise.all([
        fetch("/api/bookings", { cache: "no-store" }),
        fetch("/api/cars", { cache: "no-store" }),
      ]);

      const bJson = await bRes.json();
      const cJson = await cRes.json();

      setBookings(bJson.data || []);
      setCars(cJson.data || []);
    } catch (e) {
      console.error("Dashboard fetch error:", e);
      setBookings([]);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);
  const metrics = useMemo(() => {
    const totalBookings = bookings.length;

    const rideBookings = bookings.filter((b) => b.bookingType === "RIDE").length;
    const chauffeurBookings = bookings.filter((b) => b.bookingType === "CHAUFFEUR").length;

    const statusCounts = STATUS_OPTIONS.reduce((acc, s) => {
      acc[s] = bookings.filter((b) => (b.status || "").toLowerCase() === s).length;
      return acc;
    }, {});

    const totalCars = cars.length;
    const rentalCars = cars.filter((c) => c.serviceType === "RENTAL").length;
    const otherCars = totalCars - rentalCars;

    const recentBookings = [...bookings]
      .sort((a, b) => new Date(b.createdAt || b.pickupDate) - new Date(a.createdAt || a.pickupDate))
      .slice(0, 5);

    return {
      totalBookings,
      rideBookings,
      chauffeurBookings,
      statusCounts,
      totalCars,
      rentalCars,
      otherCars,
      recentBookings,
    };
  }, [bookings, cars]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage bookings, cars and requests from here.
          </p>
        </div>

        <button
          onClick={fetchAll}
          className="w-full md:w-auto rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Bookings"
          value={loading ? "—" : metrics.totalBookings}
          sub="All Ride + Chauffeur"
        />
        <StatCard
          title="Ride Bookings"
          value={loading ? "—" : metrics.rideBookings}
          sub="bookingType = RIDE"
        />
        <StatCard
          title="Chauffeur Bookings"
          value={loading ? "—" : metrics.chauffeurBookings}
          sub="bookingType = CHAUFFEUR"
        />
        <StatCard
          title="Total Cars"
          value={loading ? "—" : metrics.totalCars}
          sub={`Rental: ${metrics.rentalCars} | Chauffeur: ${metrics.otherCars}`}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATUS_OPTIONS.map((s) => (
          <StatCard
            key={s}
            title={`Status: ${s}`}
            value={loading ? "—" : metrics.statusCounts[s]}
          />
        ))}
      </div>
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-bold">Recent Bookings</h2>
          <p className="text-sm text-gray-500">Latest 5 submissions</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="border-b p-3 text-left">Customer</th>
                <th className="border-b p-3 text-left">Phone</th>
                <th className="border-b p-3 text-left">Pickup</th>
                <th className="border-b p-3 text-left">Drop-off</th>
                <th className="border-b p-3 text-left">Date & Time</th>
                <th className="border-b p-3 text-left">Booking</th>
                <th className="border-b p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && metrics.recentBookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center">
                    No bookings found
                  </td>
                </tr>
              )}

              {!loading &&
                metrics.recentBookings.map((b) => (
                  <tr key={b._id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium">{b.fullName}</td>
                    <td className="p-3">{b.phone}</td>
                    <td className="p-3">{b.pickupLocation}</td>
                    <td className="p-3">{b.dropoffLocation || "—"}</td>
                    <td className="p-3">
                      {b.pickupDate ? new Date(b.pickupDate).toLocaleDateString() : "—"}
                      <div className="text-xs text-gray-500">{b.pickupTime || "—"}</div>
                    </td>
                    <td className="p-3">
                      <span className="rounded-full border px-2 py-1 text-xs">
                        {b.bookingType || "RIDE"}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="capitalize">{b.status || "pending"}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 text-xs text-gray-500">
          Tip: Go to “Bookings Management” for full list, editing, remarks & history.
        </div>
      </div>
    </div>
  );
}
