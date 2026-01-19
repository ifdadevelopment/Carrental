import { NextResponse } from "next/server";
import Contact from "../models/Contact";
import connectDB from "../lib/db";


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
    console.error("Contact POST Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to submit enquiry",
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: contacts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact GET Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch enquiries",
      },
      { status: 500 }
    );
  }
}
