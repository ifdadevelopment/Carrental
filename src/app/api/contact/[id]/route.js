import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import Contact from "../../models/Contact";
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; 

    const contact = await Contact.findById(id);

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; 
    const { status, remark } = await req.json();

    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    const hasChanged =
      status !== contact.status || remark !== contact.remark;
    if (hasChanged) {
      contact.statusHistory.unshift({
        status: status ?? contact.status,
        remark: remark ?? contact.remark,
        updatedAt: new Date(),
      });
      contact.statusHistory = contact.statusHistory.slice(0, 5);
    }

    if (status) contact.status = status;
    if (remark !== undefined) contact.remark = remark;

    await contact.save();

    return NextResponse.json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (error) {
    console.error("CONTACT UPDATE ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; 

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
