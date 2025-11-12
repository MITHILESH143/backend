import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
pincode:{
    type: String,
    required: true
},
officename:{
    type: String,
    required: true
},
district:{
type: String,
required: true
}
}); 
// Flexible schema — matches Excel columns dynamically

const Record = mongoose.model("Record", recordSchema);

export default Record;
