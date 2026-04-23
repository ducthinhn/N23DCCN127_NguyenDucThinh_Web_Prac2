const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const orderRoutes = require("./routes/orderRoutes");

/**
 * TẠI SAO DÙNG EXPRESS?
 *
 * Express là framework web Node.js nhẹ nhưng mạnh mẽ:
 * - Dễ sử dụng: Syntax đơn giản, dễ học
 * - Flexible: Tùy chỉnh middleware và routing
 * - Performance: Fast, xử lý nhiều request đồng thời
 * - Ecosystem: Có rất nhiều thư viện hỗ trợ
 * - RESTful: Dễ xây dựng RESTful API
 *
 * Thay thế: Django (Python), Spring (Java), Laravel (PHP)
 */

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Logging HTTP requests

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Order Management API is running",
  });
});

// Connect MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use("/api/orders", orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test: http://localhost:${PORT}`);
});
