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
      cb(new Error("Only PDF or ZIP files are allowed"), false);
    }
  },
});

export default uploadDocument;