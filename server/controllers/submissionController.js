import Contact from "../models/Contact.js";
import EnrollmentRequest from "../models/EnrollmentRequest.js";

// GET /api/submissions
// The admin "Inquiries" page (and Dashboard stat cards) expect one flat
// list of leads. There's no single "Submission" collection for this in the
// data model — real leads live in two separate places: raw contact-form
// messages (Contact) and enroll-via-WhatsApp/email requests
// (EnrollmentRequest). This combines both into the shape the frontend
// already parses (name/email/phone/message/status/createdAt), newest first.
// IDs are prefixed with their source so DELETE knows which collection to
// hit — the frontend treats _id as an opaque string either way.
export const getSubmissions = async (req, res, next) => {
  try {
    const [contacts, enrollmentRequests] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).lean(),
      EnrollmentRequest.find()
        .populate("student", "name email phone")
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    const contactLeads = contacts.map((c) => ({
      _id: `contact-${c._id}`,
      name: c.name,
      email: c.email,
      phone: c.phone || "",
      subject: c.subject || "General Inquiry",
      message: c.message,
      status: c.isRead ? "Contacted" : "New",
      createdAt: c.createdAt,
    }));

    const enrollmentLeads = enrollmentRequests.map((r) => ({
      _id: `enrollment-${r._id}`,
      name: r.student?.name || "Unknown",
      email: r.student?.email || "",
      phone: r.student?.phone || "",
      subject: r.itemTitle,
      message: `Requested to enroll in "${r.itemTitle}" (${r.itemType}) via ${r.method} — fee ₹${r.amount}. Request code: ${r.requestCode}.`,
      status: r.status === "pending" ? "New" : "Resolved",
      createdAt: r.createdAt,
    }));

    const combined = [...contactLeads, ...enrollmentLeads].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    res.json({ success: true, data: combined });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/submissions/:id
// id arrives prefixed ("contact-<id>" or "enrollment-<id>") from the list
// above, so we know which collection it actually belongs to.
export const deleteSubmission = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.startsWith("contact-")) {
      await Contact.findByIdAndDelete(id.replace("contact-", ""));
    } else if (id.startsWith("enrollment-")) {
      await EnrollmentRequest.findByIdAndDelete(id.replace("enrollment-", ""));
    } else {
      return res.status(400).json({ success: false, error: "Unrecognized submission id" });
    }
    res.json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};