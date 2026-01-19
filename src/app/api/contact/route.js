import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import Contact from "../models/Contact";

/* ========== CREATE CONTACT ========== */
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const contact = await Contact.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Contact enquiry submitted successfully",
        data: contact,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

/* ========== GET ALL CONTACTS ========== */
export async function GET() {
  await connectDB();

  const contacts = await Contact.find()
    .sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    data: contacts,
  });
}
