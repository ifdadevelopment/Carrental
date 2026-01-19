"use client";

import { useEffect, useState } from "react";

export default function Contacts() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/bookings");
    const json = await res.json();
    setData(json.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData =
    filter === "all"
      ? data
      : data.filter((item) => item.status === filter);

  const updateStatus = async (id, status, remark) => {
    await fetch(`/api/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, remark }),
    });
    fetchData();
  };

  const deleteRecord = async (id) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Contact / Booking Requests</h1>

        <select
          className="border rounded px-3 py-2 w-full md:w-48"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Pickup</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Remark</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && filteredData.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No records found
                </td>
              </tr>
            )}

            {filteredData.map((item) => (
              <RowItem
                key={item._id}
                item={item}
                onUpdate={updateStatus}
                onDelete={deleteRecord}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function RowItem({ item, onUpdate, onDelete }) {
  const [status, setStatus] = useState(item.status);
  const [remark, setRemark] = useState(item.remark || "");

  return (
    <tr className="border-t">
      <td className="p-3 font-medium">{item.fullName}</td>

      <td className="p-3">
        <div>{item.email}</div>
        <div className="text-gray-500">{item.phone}</div>
      </td>

      <td className="p-3">{item.pickupLocation}</td>

      <td className="p-3">
        {new Date(item.pickupDate).toLocaleDateString()} <br />
        <span className="text-gray-500">{item.pickupTime}</span>
      </td>

      <td className="p-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </td>

      <td className="p-3">
        <input
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Add remark"
          className="border rounded px-2 py-1 w-full"
        />
      </td>

      <td className="p-3 flex gap-2 justify-center">
        <button
          onClick={() => onUpdate(item._id, status, remark)}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Save
        </button>

        <button
          onClick={() => onDelete(item._id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
