"use client";

import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaSave,
} from "react-icons/fa";

const PAGE_SIZE = 10;

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bookingType, setBookingType] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const [editingId, setEditingId] = useState(null);
  const [viewRow, setViewRow] = useState(null);
  const [page, setPage] = useState(1);

  /* ================= FETCH ================= */
  const fetchBookings = async () => {
    setLoading(true);

    const params = new URLSearchParams();
    if (bookingType !== "ALL") params.append("bookingType", bookingType);
    if (status !== "ALL") params.append("status", status);

    const res = await fetch(`/api/bookings?${params.toString()}`);
    const json = await res.json();

    setBookings(json.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
    setPage(1);
  }, [bookingType, status]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(bookings.length / PAGE_SIZE);
  const paginated = bookings.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ================= UPDATE ================= */
  const saveUpdate = async (row) => {
    await fetch(`/api/bookings/${row._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: row.status,
        remark: row.remark,
      }),
    });

    setEditingId(null);
    fetchBookings();
  };

  /* ================= DELETE ================= */
  const deleteRow = async (id) => {
    if (!confirm("Delete this booking?")) return;
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    fetchBookings();
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Bookings Management</h1>

        <div className="flex md:gap-3 gap-2">
          <select
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
            className="border rounded md:px-3 md:py-2 px-2 py-1"
          >
            <option value="ALL">All</option>
            <option value="RIDE">Ride</option>
            <option value="CHAUFFEUR">Chauffeur</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded md:px-3 md:py-2 px-2 py-1"
          >
            <option value="ALL">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Pickup Location</th>
              <th className="border p-2">Pickup Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="8" className="p-4 text-center">Loading...</td>
              </tr>
            )}

            {!loading && paginated.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center">No records found</td>
              </tr>
            )}

            {paginated.map((row, i) => {
              const editing = editingId === row._id;

              return (
                <tr key={row._id} className="border-t">
                  <td className="p-2">{(page - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="p-2">{row.fullName}</td>
                  <td className="p-2">{row.email}</td>
                  <td className="p-2">{row.phone}</td>
                  <td className="p-2">{row.pickupLocation}</td>
                  <td className="p-2">
                    {new Date(row.pickupDate).toLocaleDateString()}
                  </td>

                  <td className="p-2">
                    {editing ? (
                      <div className="space-y-1">
                        <select
                          value={row.status}
                          onChange={(e) =>
                            setBookings((prev) =>
                              prev.map((x) =>
                                x._id === row._id
                                  ? { ...x, status: e.target.value }
                                  : x
                              )
                            )
                          }
                          className="border px-2 py-1 rounded w-full"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>

                        <input
                          placeholder="Remark"
                          value={row.remark || ""}
                          onChange={(e) =>
                            setBookings((prev) =>
                              prev.map((x) =>
                                x._id === row._id
                                  ? { ...x, remark: e.target.value }
                                  : x
                              )
                            )
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                      </div>
                    ) : (
                      <span className="capitalize">{row.status}</span>
                    )}
                  </td>

                  <td className="p-2 text-center space-x-3">
                    <button onClick={() => setViewRow(row)} className="text-blue-600 md:text-sm text-sm"><FaEye /></button>

                    {editing ? (
                      <button onClick={() => saveUpdate(row)} className="text-green-600 md:text-sm text-sm"><FaSave /></button>
                    ) : (
                      <button onClick={() => setEditingId(row._id)} className="text-blue-600 md:text-sm text-sm"><FaEdit /></button>
                    )}

                    <button onClick={() => deleteRow(row._id)}className="text-red-600 md:text-sm text-sm"><FaTrash /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {viewRow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setViewRow(null)} className="absolute top-3 right-3">
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold mb-3">Booking Details</h2>

            <p><b>Name:</b> {viewRow.fullName}</p>
            <p><b>Email:</b> {viewRow.email}</p>
            <p><b>Phone:</b> {viewRow.phone}</p>
            <p><b>Pickup Location:</b> {viewRow.pickupLocation}</p>
            <p><b>Pickup Date:</b> {new Date(viewRow.pickupDate).toLocaleString()}</p>
            {viewRow.bookingType === "RIDE" && viewRow.returnDate && (
              <p><b>Return Date:</b> {new Date(viewRow.returnDate).toLocaleDateString()}</p>
            )}
            {viewRow.bookingType === "CHAUFFEUR" && (
              <>
                <p><b>Drop-off:</b> {viewRow.dropoffLocation}</p>
                <p><b>Passengers:</b> {viewRow.passengers}</p>
                <p><b>Trip Type:</b> {viewRow.tripType}</p>
                <p><b>Pickup Time:</b> {viewRow.pickupTime}</p>
                {viewRow.flightNumber && (
                  <p><b>Flight No:</b> {viewRow.flightNumber}</p>
                )}
              </>
            )}

            <p><b>Status:</b> {viewRow.status}</p>
            <p><b>Remark:</b> {viewRow.remark || "—"}</p>

            {viewRow.statusHistory?.length > 0 && (
              <>
                <hr className="my-4" />
                <h3 className="font-semibold mb-2">Last 5 Updates</h3>

                {viewRow.statusHistory.slice(0, 5).map((h, i) => (
                  <div key={i} className="border rounded p-2 mb-2 text-sm bg-gray-50">
                    <p><b>Status:</b> {h.status}</p>
                    <p><b>Remark:</b> {h.remark || "—"}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(h.updatedAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
