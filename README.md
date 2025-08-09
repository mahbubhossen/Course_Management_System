# Course Management System


**Live Site:** https://coursebdbymhb.netlify.app/

---

## Overview
The Course Management System is a full-stack MERN application that allows users to explore, create, and enroll in online courses. It features seat tracking, enrollment limitations, private routes, and full course management for authenticated users.

---

## Technologies Used

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- DaisyUI
- Firebase Authentication
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- CORS
- dotenv

---

## Core Features
- **Authentication:** Email/password & Google login using Firebase.
- **Course Creation:** Logged-in users can create courses.
- **Enrollments:** Enroll in courses with seat limitations.
- **Restrictions:** Prevent enrollment in more than 3 courses.
- **Course Management:** Edit/delete your own courses.
- **Dynamic Data:** Live seat availability updates.
- **Private Routes:** Access to certain pages only for logged-in users.

---

## Dependencies
**Frontend:**
- react
- react-router-dom
- firebase
- react-toastify
- tailwindcss
- daisyui

**Backend:**
- express
- mongodb
- cors
- dotenv

---

## Running the Project Locally

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/course-management-system.git
cd course-management-system
