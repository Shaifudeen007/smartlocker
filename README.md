### Live : https://ssmartlocker.netlify.app/
### Backend : https://smartlocker-6tj0.onrender.com/

# 🔒 Smart Storage Locker Management System

A **Full-Stack Web Application** that allows users to register, log in, and manage smart storage lockers efficiently.  
Built to demonstrate complete **Full Stack Development** using **Django REST Framework (Backend)** and **React (Frontend)** with **JWT-based Authentication** and **Role-Based Access Control**.

---

## 🚀 Tech Stack

### 🖥️ Backend
- **Django** (Latest Stable)
- **Django REST Framework (DRF)**
- **Django Simple JWT** for authentication
- **PostgreSQL / MySQL** as the database

### 💻 Frontend
- **React (Latest Stable)**
- **Vite** for fast development
- **Tailwind CSS** for styling

---

## 🧩 Features

### 🔐 Authentication & Authorization
- User Registration and Login
- JWT-based Authentication
- Role-Based Access Control (Admin & User)
- Secure Endpoints for Admin-only operations

### 📦 Locker Management
- Admin can create, update, and delete lockers
- Users can view all available lockers
- Each locker shows **status**, **number**, and **location**

### 📅 Reservation Management
- Users can:
  - View available lockers
  - Reserve lockers for a specific time
  - Release or cancel their reservations
- Admins can:
  - View all reservations
  - Monitor locker usage history

### 🧠 Bonus
- Clean project structure
- Consistent API design and error handling
- Responsive UI with Tailwind
- Extensible models and modular code organization

## ⚙️ Project Setup Guide

### 🧠 Backend Setup (Django)

# Clone repository
git https://github.com/Shaifudeen007/smartlocker
cd smartlocker/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # for Linux/Mac
venv\Scripts\activate     # for Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file
touch .env

# Add variables inside .env
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/smartlocker

# Run migrations and start server
python manage.py migrate
python manage.py runserver

# Frontend Setup (React + Vite)
cd ../frontend
npm install
npm run dev
