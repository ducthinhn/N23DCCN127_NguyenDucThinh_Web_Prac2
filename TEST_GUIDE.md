## 📋 ORDER MANAGEMENT API - TEST GUIDE

### 🚀 Setup

```bash
cd order-management-api
npm install
npm run dev
```

Server chạy: `http://localhost:5000`

---

### 🧪 TEST NHANH VỚI CURL

#### 1️⃣ CREATE ORDER (POST)

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Nguyễn Văn A",
    "customerEmail": "nguyen@example.com",
    "items": [
      {
        "productName": "Laptop",
        "quantity": 1,
        "unitPrice": 15000000
      },
      {
        "productName": "Chuột",
        "quantity": 2,
        "unitPrice": 200000
      }
    ],
    "totalAmount": 15400000
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "...",
    "customerName": "Nguyễn Văn A",
    "customerEmail": "nguyen@example.com",
    "items": [...],
    "totalAmount": 15400000,
    "status": "pending",
    "createdAt": "2026-04-20T..."
  }
}
```

---

#### 2️⃣ GET ALL ORDERS (GET)

```bash
curl http://localhost:5000/api/orders
```

---

#### 3️⃣ GET BY ID (GET)

```bash
curl http://localhost:5000/api/orders/[ORDER_ID]
```

---

#### 4️⃣ UPDATE ORDER (PUT)

```bash
curl -X PUT http://localhost:5000/api/orders/[ORDER_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed"
  }'
```

---

#### 5️⃣ DELETE ORDER (DELETE)

```bash
curl -X DELETE http://localhost:5000/api/orders/[ORDER_ID]
```

---

#### 6️⃣ FILTER BY STATUS (GET)

```bash
curl "http://localhost:5000/api/orders?status=pending"
```

---

#### 7️⃣ SEARCH BY NAME (GET)

```bash
curl "http://localhost:5000/api/orders/search/nguyen"
```

---

#### 8️⃣ SORT BY TOTAL AMOUNT (GET)

```bash
curl "http://localhost:5000/api/orders?sort=desc"
```

Ascending:

```bash
curl "http://localhost:5000/api/orders?sort=asc"
```

---

### 📱 POSTMAN TEST (Import Collection)

Tạo 8 request trong Postman:

#### **1. POST - Create Order**

- **URL:** `http://localhost:5000/api/orders`
- **Method:** POST
- **Header:** Content-Type: application/json
- **Body (raw JSON):**

```json
{
  "customerName": "Trần Thị B",
  "customerEmail": "tran@example.com",
  "items": [
    {
      "productName": "iPhone 15",
      "quantity": 1,
      "unitPrice": 25000000
    },
    {
      "productName": "Case",
      "quantity": 1,
      "unitPrice": 500000
    }
  ],
  "totalAmount": 25500000
}
```

#### **2. GET - All Orders**

- **URL:** `http://localhost:5000/api/orders`
- **Method:** GET

#### **3. GET - Order by ID**

- **URL:** `http://localhost:5000/api/orders/{{order_id}}`
- **Method:** GET

#### **4. PUT - Update Status**

- **URL:** `http://localhost:5000/api/orders/{{order_id}}`
- **Method:** PUT
- **Body (raw JSON):**

```json
{
  "status": "shipped"
}
```

#### **5. DELETE - Delete Order**

- **URL:** `http://localhost:5000/api/orders/{{order_id}}`
- **Method:** DELETE

#### **6. GET - Filter by Status**

- **URL:** `http://localhost:5000/api/orders?status=pending`
- **Method:** GET

#### **7. GET - Search by Name**

- **URL:** `http://localhost:5000/api/orders/search/tran`
- **Method:** GET

#### **8. GET - Sort Descending**

- **URL:** `http://localhost:5000/api/orders?sort=desc`
- **Method:** GET

---

### ✅ EXPECTED RESPONSES

**Success (201):**

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {...}
}
```

**Error (400):**

```json
{
  "success": false,
  "message": "Total amount mismatch. Expected: 15400000, Got: 15000000"
}
```

**Not Found (404):**

```json
{
  "success": false,
  "message": "Order not found"
}
```

---

### 🔧 TROUBLESHOOTING

- **Port 5000 in use:** Thay đổi PORT trong `.env`
- **MongoDB connection failed:** Kiểm tra MONGO_URI trong `.env`
- **No orders found:** Tạo order trước bằng POST

---

**Mọi API đều trả dạng chuẩn với `success` + `message` + `data`**
