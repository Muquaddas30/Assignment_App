const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

const authRoutes = require("./routes/authRoute");
const adminRoutes = require('./routes/adminRoute');

// Middleware
app.use(express.json());

// Route Mounting
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); // ✅ You missed this

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Server Listen
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
