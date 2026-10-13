const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, "data.txt");

// Save data in file
app.post("/save", (req, res) => {
    const content = req.body.content;

    fs.appendFile(filePath, content + "\n", "utf8", (err) => {
        if (err) {
            return res.status(500).json({
                message: "Error saving data"
            });
        }

        res.json({ message: "Data saved successfully!" });
    });
});

// Read and show data
app.get("/show", (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err && err.code === "ENOENT") {
            return res.json({ content: "" });
        }

        if (err) {
            return res.status(500).json({
                message: "Error reading file"
            });
        }

        res.json({ content: data });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});