# 🧾 Unitrade - Student Marketplace

Unitrade is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application built for university students to **sell and buy academic notes, study materials, and university goods**. Designed with a beautiful and modern UI, it allows users to create accounts, upload their products with images (via Cloudinary), manage carts, place orders, and track their purchases seamlessly.

🔗 **Live Demo**: [https://unitrade-app.vercel.app](https://unitrade-app.vercel.app) *(Replace with your actual deployment link)*

---

## 🚀 Features

### 🔐 Authentication (JWT-Based)

* User signup/login with password encryption using `bcryptjs`
* Secure route protection using JWT

### 🛍️ Product Management

* Upload product details along with multiple images
* Cloudinary integration for storing images
* View products in a beautiful, responsive UI
* Filter and view details of each product

### 🛒 Cart System

* Add/remove products from cart
* View cart summary and pricing

### 📦 Order Management

* Place orders securely
* Track and view placed orders in the Orders section

### 📁 Cloudinary Integration

* All images are uploaded directly to Cloudinary
* Secure and scalable image hosting

### ✨ UI & Animations

* Smooth scroll animations using `locomotive-scroll`
* Framer Motion for page transitions and animations
* Modern UI built with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* React.js 19
* React Router v7
* Axios
* Tailwind CSS
* React Icons
* Framer Motion
* Locomotive Scroll
* React Toastify (for notifications)

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* Cloudinary (for image uploads)
* JWT (Authentication)
* Multer (Handling file uploads)
* Bcryptjs (Password hashing)
* Dotenv (Environment variable handling)

---

## 📂 Folder Structure

```
unitrade/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── public/
└── README.md
```

---

## 🧪 Running the Project Locally

### Prerequisites

* Node.js
* MongoDB Atlas (or local MongoDB)
* Cloudinary account

### Backend Setup

```bash
cd backend
npm install

# Create a .env file
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots

*(Add images here to show homepage, product page, cart, and order views)*

---

## 👨‍💻 Author

* **Nikhil Saini**
  [LinkedIn](https://linkedin.com/in/your-profile) • [GitHub](https://github.com/your-github)

---

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Show your support

If you like this project, give it a ⭐️ on GitHub and consider sharing it!

---

## ✅ To-Do (Future Scope)

* Add payment integration (e.g., Razorpay, Stripe)
* Implement search, filters, and sorting
* Add wishlist functionality
* Enable chat or messaging between users
* Add admin panel for managing users and products
