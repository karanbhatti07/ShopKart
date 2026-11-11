# 🛍️ ShopKart – Full Stack E-Commerce Website

ShopKart is a full-stack e-commerce web application built using the MERN stack. It provides users with a seamless online shopping experience along with powerful admin management features.

## 🚀 Features

### User Features
- User Registration and Login
- Product Browsing and Categories
- Product Details and Reviews
- Shopping Cart
- Wishlist Management
- Secure Checkout
- Online Payment using Razorpay
- Cash on Delivery
- Order Tracking
- User Profile Management
- Forgot Password

### Admin Features
- Admin Dashboard
- Product Management
- Order Management
- User Management
- Order Status Updates

### Additional Features
- Responsive User Interface
- Authentication and Authorization
- Image Upload
- Chatbot Support
- Redux State Management

## 🛠️ Tech Stack

**Frontend**
- React.js
- JavaScript
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

**Payment Integration**
- Razorpay

## 📁 Project Structure

```text
ShopKart/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── Pages/
│       ├── redux/
│       ├── services/
│       └── App.jsx
│
└── README.md
```

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/karanbhatti07/ShopKart.git
cd ShopKart
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Configure your environment variables before starting the backend.

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## 🔐 Environment Configuration

Configure the required environment variables for MongoDB, authentication, email and Razorpay credentials.

Never upload secret keys or `.env` files to GitHub.

## 👨‍💻 Developer

**Karan Bhatti**

GitHub: https://github.com/karanbhatti07

---

⭐ If you like this project, consider giving it a star!