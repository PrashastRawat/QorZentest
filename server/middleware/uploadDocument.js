import multer from "multer";

// Same memory-storage pattern as upload.js — buffer straight to Cloudinary,
// nothing saved locally. Separate instance because assignment submissions
// need PDF/zip, not images.
const storage = multer.memoryStorage();

const uploadDocument = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max — larger than images since zips can be bigger
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/zip",
      "application/x-zip-compressed",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error("Only PDF or ZIP files are allowed");
      error.statusCode = 400;
      cb(error, false);
    }
  },
});

// Separate instance for CV/resume uploads (internship applications) —
// these are advertised to applicants as "PDF/DOC", so unlike
// uploadDocument above, this one accepts Word docs instead of zips.
export const uploadResume = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error("Please upload your CV in PDF or DOC format.");
      error.statusCode = 400;
      cb(error, false);
    }
  },
});

export default uploadDocument;