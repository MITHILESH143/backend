import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadExcel } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", upload.single("file"), uploadExcel);

export default router;
