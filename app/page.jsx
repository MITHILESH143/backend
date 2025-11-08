'use client';

import React, { useState } from "react";
import axios from "axios";

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select an Excel file!");

    const formData = new FormData();
   formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(`${res.data.message} (${res.data.count} records added)`);
    } catch (err) {
      setMessage("Error uploading file");
    }
  };

  return (
    <div>
      <h2>Upload Post Office Data</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
};

export default UploadExcel;
