# 📦 Order Management API

RESTful API quản lý đơn hàng bằng Node.js + Express + MongoDB Atlas

## 📁 Structure

```
order-management-api/
├── models/
│   └── Order.js
├── routes/
│   └── orderRoutes.js
├── utils/
│   └── calculateTotal.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── TEST_GUIDE.md
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB

Chỉnh sửa `.env`:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/order_management?retryWrites=true&w=majority
```

### 3. Run Server

```bash
npm run dev
```

Server chạy: `http://localhost:5000`

## 📡 API Endpoints

| Method | Endpoint                   | Mô tả                                      |
| ------ | -------------------------- | ------------------------------------------ |
| GET    | `/api/orders`              | Lấy tất cả đơn hàng (hỗ trợ filter & sort) |
| GET    | `/api/orders/:id`          | Lấy chi tiết đơn hàng                      |
| GET    | `/api/orders/search/:name` | Tìm kiếm theo tên khách hàng               |
| POST   | `/api/orders`              | Tạo đơn hàng mới                           |
| PUT    | `/api/orders/:id`          | Cập nhật đơn hàng                          |
| DELETE | `/api/orders/:id`          | Xóa đơn hàng                               |

## 🧪 Testing

Xem chi tiết tại `TEST_GUIDE.md`

Quick test:

```bash
curl http://localhost:5000
```

## 📝 Order Schema

```javascript
{
  customerName: String (required),
  customerEmail: String (required),
  items: [
    {
      productName: String,
      quantity: Number (min: 1),
      unitPrice: Number
    }
  ],
  totalAmount: Number (required),
  status: enum ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
  createdAt: Date (default: Date.now)
}
```

## ⚙️ Scripts

- `npm start` - Chạy server
- `npm run dev` - Chạy server với nodemon (auto-reload)

## 🛡️ Features

✅ CRUD operations
✅ Filter by status
✅ Search by customer name
✅ Sort by total amount
✅ Total amount validation
✅ Error handling (400, 404, 500)
✅ Standard response format
✅ MongoDB integration
