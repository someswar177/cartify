# 🛒 Cartify Project

An e-commerce cart application built as part of an assignment.  
This project demonstrates a full-stack implementation of a shopping cart with **user authentication, product listing, and cart management features**.

---

## ✨ Features

### Frontend
- **React + Context API** for state management
- **Cart Management**:
  - Add items to cart
  - Increment / Decrement quantity
  - Remove items individually
  - Clear entire cart
  - Subtotal, tax, and total calculation
- **Auth-based Cart** → Cart is stored per user; guest users are prompted to log in
- **Responsive UI** with light/dark mode
- **Toast Notifications** for user feedback
- **Protected Routes** → only logged-in users can access `/cart`

### Backend
- **Express.js + MongoDB (Mongoose)** backend
- **Cart APIs**:
  - `GET /api/cart` → Fetch user’s cart
  - `POST /api/cart` → Add item to cart
  - `PUT /api/cart` → Update item quantity
  - `DELETE /api/cart/:id` → Remove item
  - `DELETE /api/cart` → Clear cart
- **JWT Authentication Middleware** to protect routes
- Cart items are **persisted in MongoDB** so data remains consistent across refreshes

---

## 🛠️ Tech Stack

**Frontend**  
- React (Vite)  
- Context API + Reducer  
- React Router DOM  
- Tailwind CSS  
- React Hot Toast  

**Backend**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  

**Deployment**  
- Frontend: Vercel  
- Backend: Render

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm  
- MongoDB instance running locally or on Atlas  

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/someswar177/cartify-project.git
    cd cartify-project
    ```

2. **Install dependencies**
    - Frontend
      ```bash
      cd frontend
      npm install
      ```
    - Backend
      ```bash
      cd backend
      npm install
      ```

3. **Environment variables**

    Create a `.env` file inside `backend/`:

    ```env
    DATABASE=your_mongo_connection_string
    SECRET=your_jwt_secret
    ```

4. **Run locally**
    - Start backend
      ```bash
      cd backend
      npm run dev
      ```
    - Start frontend
      ```bash
      cd frontend
      npm run dev
      ```

5. Open app in browser:
    ```
    http://localhost:5173
    ```

---

## 🖥️ Demo

🔗 [Live Demo on Vercel](https://cartify-project-hazel.vercel.app)

---

## 📌 Assignment Goals Covered

- ✅ Implement a cart system with **Add / Remove / Update / Clear** features  
- ✅ Sync frontend state with **backend persistence**  
- ✅ Use **authentication** to associate cart with users  
- ✅ Deploy frontend to production (Vercel)  
- ✅ Handle **UI/UX feedback** with toasts and loaders  