const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const calculateTotal = require("../utils/calculateTotal");

/**
 * RESTful API Routes for Order Management
 *
 * RESTful (Representational State Transfer):
 * - GET: Lấy dữ liệu (safe, idempotent)
 * - POST: Tạo dữ liệu mới (unsafe)
 * - PUT: Cập nhật toàn bộ/partial dữ liệu (idempotent)
 * - DELETE: Xóa dữ liệu (idempotent)
 *
 * HTTP Status Codes:
 * - 200 OK: Thành công
 * - 201 Created: Tạo mới thành công
 * - 400 Bad Request: Dữ liệu sai
 * - 404 Not Found: Không tìm thấy
 * - 500 Server Error: Lỗi server
 */

// GET all orders with filter and sort
router.get("/", async (req, res) => {
  try {
    const { status, sort } = req.query;

    let query = {};
    if (status) {
      query.status = status;
    }

    let sortOption = { createdAt: -1 };
    if (sort === "asc") {
      sortOption = { totalAmount: 1 };
    } else if (sort === "desc") {
      sortOption = { totalAmount: -1 };
    }

    const orders = await Order.find(query).sort(sortOption);

    res.json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
    });
  }
});

// GET order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving order",
    });
  }
});

// SEARCH orders by customer name
router.get("/search/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const regex = new RegExp(name, "i");

    const orders = await Order.find({
      customerName: regex,
    });

    res.json({
      success: true,
      message: "Search results",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching orders",
    });
  }
});

/**
 * VALIDATION: Kiểm tra dữ liệu trước khi lưu
 *
 * TẠI SAO CẦN VALIDATE totalAmount?
 * - Đảm bảo data consistency: Tổng phải = sum(quantity × unitPrice)
 * - Ngăn chặn lỗi: Client tính sai, ta kiểm tra lại
 * - Security: Ngăn chặn user gửi giá trị không chính xác
 * - Business logic: Đảm bảo tính chính xác của hóa đơn
 */

// POST create new order
router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, items, totalAmount } = req.body;

    if (!customerName || !customerEmail || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: customerName, customerEmail, items",
      });
    }

    const calculatedTotal = calculateTotal(items);

    if (Math.abs(calculatedTotal - totalAmount) > 0.01) {
      return res.status(400).json({
        success: false,
        message: `Total amount mismatch. Expected: ${calculatedTotal}, Got: ${totalAmount}`,
      });
    }

    const newOrder = new Order({
      customerName,
      customerEmail,
      items,
      totalAmount: calculatedTotal,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order",
    });
  }
});

/**
 * PUT vs POST - Khác nhau?
 *
 * POST: Tạo resource mới (không idempotent)
 *   - Mỗi lần gọi tạo tài nguyên mới
 *   - POST /api/orders → tạo order mới
 *   - POST /api/orders → lại tạo order mới
 *
 * PUT: Cập nhật resource có sẵn (idempotent)
 *   - Cùng resource, cùng data → kết quả giống nhau
 *   - PUT /api/orders/123 → update order 123
 *   - PUT /api/orders/123 → vẫn là order 123 (không tạo mới)
 *
 * Idempotent: Gọi 1 lần = gọi N lần, kết quả giống nhau
 */

// PUT update order
router.put("/:id", async (req, res) => {
  try {
    const { customerName, customerEmail, items, totalAmount, status } =
      req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (customerName) order.customerName = customerName;
    if (customerEmail) order.customerEmail = customerEmail;
    if (items) {
      const calculatedTotal = calculateTotal(items);
      if (totalAmount && Math.abs(calculatedTotal - totalAmount) > 0.01) {
        return res.status(400).json({
          success: false,
          message: `Total amount mismatch. Expected: ${calculatedTotal}, Got: ${totalAmount}`,
        });
      }
      order.items = items;
      order.totalAmount = calculatedTotal;
    } else if (totalAmount) {
      order.totalAmount = totalAmount;
    }
    if (status) order.status = status;

    await order.save();

    res.json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order",
    });
  }
});

// DELETE order
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order deleted successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting order",
    });
  }
});

module.exports = router;
