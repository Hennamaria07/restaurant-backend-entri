const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();

app.use(express.static('uploads'));
app.use(cookieParser());
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(__dirname + "/uploads", express.static(__dirname + '/uploads'));
app.use(cors({ credentials: true, origin: "https://restro-world-entri.netlify.app/" }));
app.use("/api/v1", userRoutes);
app.use("/api/v1", restaurantRoutes);

module.exports = app;
