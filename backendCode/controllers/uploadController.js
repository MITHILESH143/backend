import XLSX from "xlsx";
import fs from "fs";
import Record from "../models/recordModels.js";

export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath); // Read from file path (not buffer)
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    await Record.insertMany(data);

    // optional: remove file after processing
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: "Data uploaded successfully",
      count: data.length,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Error uploading file", error: error.message });
  }
};
