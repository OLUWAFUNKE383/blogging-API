# 📝 Blogging API

A simple RESTful Blogging API built with Node.js, Express.js, MongoDB, and Mongoose. Users can register, log in, create blogs, and read public blogs with JWT authentication.

---

## 📦 Features

- User Authentication (JWT)
- CRUD operations on blog posts
- Blog states: `draft` and `published`
- Pagination, Search, Filter, and Sort
- Reading time estimation
- Swagger API Docs
- MongoDB (Mongoose ODM)

---

## 🚀 Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Swagger UI
- Jest + Supertest

---

## 📂 Folder Structure

`blogging-api/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── swagger/
├── tests/
├── utils/
`

---

## 📄 API Documentation

Access Swagger docs at:  
👉 `http://localhost:5000/api-docs`

---

## 🔐 Authentication

All protected routes require a **Bearer Token** in the header:

---

## ✅ Scripts

| Command     | Description                   |
|-------------|-------------------------------|
| `npm run dev` | Run in dev mode using nodemon |
| `npm start`   | Run the app normally          |
| `npm test`    | Run tests using Jest          |

---

## 🧪 Sample Test Coverage

File: `tests/auth.test.js`

---

## 🛠️ Setup Instructions

1. Clone the repo
2. Run `npm install`
3. Setup your `.env` file
4. Run `npm run dev`
