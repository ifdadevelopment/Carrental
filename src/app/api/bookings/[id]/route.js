import { NextResponse } from "next/server";
import connectDB from "@/app/api/lib/db";
import BookingRide from "@/app/api/models/BookingRide";
import BookingChauffeur from "@/app/api/models/BookingChauffeur";

/* ---------- HELPER: FIND MODEL ---------- */
const getBookingById = async (id) => {
  return (
    (await BookingRide.findById(id)) ||
    (await BookingChauffeur.findById(id))
  );
};

/* ================= GET (VIEW ONE) ================= */
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const booking = await getBookingById(id);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error("BOOKING GET ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/* ================= UPDATE (STATUS + REMARK) ================= */
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { status, remark } = await req.json();

    const booking = await getBookingById(id);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    const hasChanged =
      status !== booking.status || remark !== booking.remark;

    /* 🔥 PUSH HISTORY ONLY IF CHANGED */
    if (hasChanged) {
      booking.statusHistory.unshift({
        status: status ?? booking.status,
        remark: remark ?? booking.remark,
        updatedAt: new Date(),
      });

      // keep last 5 only
      booking.statusHistory = booking.statusHistory.slice(0, 5);
    }

    if (status) booking.status = status;
    if (remark !== undefined) booking.remark = remark;

    await booking.save();

    return NextResponse.json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    console.error("BOOKING UPDATE ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/* ================= DELETE ================= */
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const deleted =
      (await BookingRide.findByIdAndDelete(id)) ||
      (await BookingChauffeur.findByIdAndDelete(id));

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("BOOKING DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
