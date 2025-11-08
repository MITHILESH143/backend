import express from "express";
import cors from "cors";
import multer from "multer";
import xlsx from "xlsx";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import PostOffice from "./models/PostOfficeModel.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

// Multer setup for Excel uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// Upload API
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Make sure the Excel columns are exactly: pincode, officename, district
    const formattedData = sheetData.map((row) => ({
      pincode: row.pincode?.toString(),
      officename: row.officename,
      district: row.district,
    }));

    await PostOffice.insertMany(formattedData);

    res.json({
      message: "✅ Data uploaded successfully!",
      count: formattedData.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload data" });
  }
});

// Optional: Fetch all stored data
app.get("/postoffices", async (req, res) => {
  const data = await PostOffice.find();
  res.json(data);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});
