💸 EXPENSO — Personal Expense Tracking Platform

Expenso is a smart, simple, and efficient finance-tracking application built to help users manage their money with clarity, control, and discipline.
Developed in March 2025, this project focuses on delivering essential financial insights through a clean UI and fast server-side rendering architecture.

🚀 Project Overview

Expenso is designed to make personal finance management effortless.
Whether you're tracking daily expenses, monitoring savings, or planning future goals, Expenso gives you real-time clarity and structured insights — all in one place.

✨ Features
📊 Core Functionalities

✔ Add Expenses & Income

✔ Instant Transaction Analysis

✔ Time-Based Statistics (daily, weekly, monthly, or custom period)

✔ Savings / Event Goal Setting

✔ Insightful chart-based overview (if applicable)

✔ *Neat, clean, responsive UI powered by Handlebars SSR

🧩 Tech Stack
Layer	Technology
Backend Framework	Node.js + Express.js
Database	MongoDB Atlas (Cloud NoSQL DB)
View Engine	Handlebars (HBS)
Rendering	SSR (Server-Side Rendering)
Deployment	Render
Package Manager	npm

👉 SSR boosts SEO performance, making Expenso fast, secure, and search-engine friendly.

🛠 Installation & Setup Guide

Follow these steps to run Expenso locally on your system.

1️⃣ Clone the Repository
git clone https://github.com/Balaraman-dev/Expenso.git

2️⃣ Navigate into the Project
cd Expenso

3️⃣ Install Required Dependencies

Ensure that Node.js (v16+) and npm are installed.

npm install

4️⃣ Configure Environment Variables

Create a .env file in the root directory:

MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
SESSION_SECRET=your_secret_key


Replace values with your own.

5️⃣ Start the Development Server
npm run dev


Or, if using normal start:

npm start


Your server will run on:

http://localhost:5000

6️⃣ Build & Deploy on Render (Optional)

To deploy on Render:

Create a new Web Service

Connect your GitHub repository

Set Build Command:

npm install


Set Start Command:

npm start


Add Environment Variables (MONGO_URI, SESSION_SECRET, PORT)

Deploy 🎉

🔥 Live Demo

Experience Expenso here:
👉 https://expenso-tt28.onrender.com/

📂 Project Structure
Expenso/
│── public/
│── views/
│   ├── layouts/
│   ├── partials/
│   ├── pages/
│── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│── .env
│── index.js
│── package.json
│── README.md

📱 Future Enhancements
Coming Soon: Expenso Mobile App

📌 Offline accessibility

📌 Faster daily expense logging

📌 Instant notifications

📌 Simplified tracking on the go

Finance management shouldn't rely only on browser access — the mobile version will make tracking even smoother.

🌟 Why Expenso?

Clean UI

Fast SSR performance

Data stored securely in cloud DB

Easy for anyone to track daily spending

Built with scalability in mind





![Login](https://github.com/user-attachments/assets/f10e790f-59e2-49ee-b019-ed6b99327a9e)
![Home](https://github.com/user-attachments/assets/65ac5766-e9c3-4b7f-98b0-2d88531ad7c2)
![Goal](https://github.com/user-attachments/assets/eb9a54d7-abf6-49a5-a1c8-1219696187eb)
![Transaction](https://github.com/user-attachments/assets/c54e84c2-1e2a-4e55-847f-34880174122c)
![Register](https://github.com/user-attachments/assets/94441bdd-699a-44f0-8742-70cbf7a60e78)
![Profile](https://github.com/user-attachments/assets/0495f500-2dd1-4487-9562-84929e44ced6)

