const express = require("express");
const app = express();
const path = require("path");

// Serve static files from the 'public' folder
app.use(express.static("public"));
app.use(express.json());

// Serve the index.html file when the root URL is accessed
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});