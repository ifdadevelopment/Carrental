"use client";

import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaSave,
} from "react-icons/fa";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

const PAGE_SIZE = 10;

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [viewContact, setViewContact] = useState(null);
  const [page, setPage] = useState(1);

  /* ================= FETCH ================= */
  const fetchContacts = async () => {
    setLoading(true);
    const res = await fetch("/api/contact");
    const json = await res.json();
    setContacts(json.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  /* ================= FILTER ================= */
  const filtered =
    filter === "all"
      ? contacts
      : contacts.filter((c) => c.status === filter);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ================= UPDATE ================= */
  const saveUpdate = async (contact) => {
    await fetch(`/api/contact/${contact._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: contact.status,
        remark: contact.remark,
      }),
    });

    setEditingId(null);
    fetchContacts();
  };

  /* ================= DELETE ================= */
  const deleteContact = async (id) => {
    if (!confirm("Delete this contact?")) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    fetchContacts();
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Contact Enquiries</h1>

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2 w-full md:w-48"
        >
          <option value="all">All</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Service</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Status</th>
              <th className="border p-2 text-center">Actions</th>
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

            {!loading && paginated.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No records
                </td>
              </tr>
            )}

            {paginated.map((c) => {
              const editing = editingId === c._id;

              return (
                <tr key={c._id} className="border-t">
                  <td className="p-2 font-medium">{c.fullName}</td>
                  <td className="p-2">{c.phone || "—"}</td>
                  <td className="p-2">{c.email}</td>
                  <td className="p-2">{c.serviceType}</td>
                  <td className="p-2 max-w-xs truncate">
                    {c.message || "—"}
                  </td>

                  {/* STATUS + REMARK */}
                  <td className="p-2">
                    {editing ? (
                      <div className="space-y-1">
                        <select
                          value={c.status}
                          onChange={(e) =>
                            setContacts((prev) =>
                              prev.map((x) =>
                                x._id === c._id
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
                          value={c.remark || ""}
                          onChange={(e) =>
                            setContacts((prev) =>
                              prev.map((x) =>
                                x._id === c._id
                                  ? { ...x, remark: e.target.value }
                                  : x
                              )
                            )
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                      </div>
                    ) : (
                      <span className="capitalize">{c.status}</span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-2 text-center space-x-3">
                    <button onClick={() => setViewContact(c)}>
                      <FaEye />
                    </button>

                    {editing ? (
                      <button onClick={() => saveUpdate(c)}>
                        <FaSave />
                      </button>
                    ) : (
                      <button onClick={() => setEditingId(c._id)}>
                        <FaEdit />
                      </button>
                    )}

                    <button onClick={() => deleteContact(c._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border
                ${page === i + 1 ? "bg-black text-white" : "bg-white"}
              `}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {viewContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setViewContact(null)}
              className="absolute top-3 right-3"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold mb-3">Contact Details</h2>

            <p><b>Name:</b> {viewContact.fullName}</p>
            <p><b>Email:</b> {viewContact.email}</p>
            <p><b>Phone:</b> {viewContact.phone || "—"}</p>
            <p><b>Service:</b> {viewContact.serviceType}</p>
            <p><b>Message:</b> {viewContact.message || "—"}</p>
            <p><b>Status:</b> <span className="capitalize">{viewContact.status}</span></p>
            <p><b>Remark:</b> {viewContact.remark || "—"}</p>

            {/* ✅ LAST 5 STATUS HISTORY */}
            {viewContact.statusHistory?.length > 0 && (
              <>
                <hr className="my-4" />
                <h3 className="font-semibold mb-2">Last 5 Updates</h3>

                {viewContact.statusHistory
                  .slice(0, 5)
                  .map((h, i) => (
                    <div
                      key={i}
                      className="border rounded p-2 mb-2 text-sm bg-gray-50"
                    >
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
