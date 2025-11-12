import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({}, { strict: false }); 
// Flexible schema — matches Excel columns dynamically

const Record = mongoose.model("Record", recordSchema);

export default Record;
