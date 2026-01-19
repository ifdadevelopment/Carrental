import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Contact enquiry submitted successfully",
      data: contact,
    });

  } catch (error) {
    console.error("Contact Save Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to submit enquiry",
    });
  }
};
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: contacts,
    });

  } catch (error) {
    console.error("Contact Fetch Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
    });
  }
};
