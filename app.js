const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

const authRoutes = require("./routes/authRoute");
const adminRoutes = require('./routes/adminRoute');
const teacherRoute = require("./routes/teacherRoute")

app.use(express.json());

// Route
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teachers", teacherRoute);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
