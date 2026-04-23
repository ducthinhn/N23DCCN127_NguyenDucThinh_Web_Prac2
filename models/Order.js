const mongoose = require("mongoose");

/**
 * MONGOOSE: ORM (Object-Relational Mapping) cho MongoDB
 *
 * Ưu điểm:
 * - Schema validation: Kiểm tra kiểu dữ liệu
 * - Middleware hooks: Pre/post operations
 * - Built-in validators: required, min, max, enum, etc.
 * - Relationships: Dễ quản lý liên kết giữa collections
 *
 * Khác MongoDB thuần:
 * - MongoDB: Flexible schema, không validation
 * - Mongoose: Strict schema, có validation
 */

const itemSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  items: [itemSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
  /**
   * ENUM: Giới hạn giá trị chỉ trong những lựa chọn được định nghĩa
   * - Đảm bảo data consistency
   * - Ngăn chặn giá trị invalid
   * - Dễ validate ở database level
   */
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
