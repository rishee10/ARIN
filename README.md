## Marketing Metrics Tracker

A full-stack internal microservice to track and visualize real-time performance metrics of marketing campaigns.

🚀 Tech Stack

Frontend: React, Axios, React Router

Backend: Node.js, Express, MySQL, JWT

#### Download the repo

### ⚙️ Backend Setup

Navigate to backend folder:
`cd backend`

Install dependencies:
`npm install`

Create a .env file:

`DB_HOST=localhost`

`DB_USER=root`

`DB_PASSWORD=your_password`

`DB_NAME=campaign_db`

`JWT_SECRET=your_jwt_secret`

Start the backend:

`npm run dev`

Make sure MySQL is running and campaigns table is created.


### 💻 Frontend Setup

Navigate to frontend folder:
`cd frontend`

Install dependencies:
`npm install`

Start the frontend:
`npm start`

Open in browser:
`http://localhost:3000`

### ✅ Features

🔐 User authentication with JWT

➕ Add new marketing campaigns

🔄 Update existing campaign metrics

❌ Delete campaigns

🔍 Filter campaigns by name

🎯 Dashboard to view performance data

### 🗃️ MySQL Table Schema

```
CREATE TABLE campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  date DATE,
  impressions INT,
  clicks INT,
  conversions INT
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);
```

### 📬 API Endpoints

Auth

```
POST /api/auth/signup   { email, password }
POST /api/auth/login    { email, password }
```

Campaigns (Protected)

```
GET    /api/campaigns
POST   /api/campaigns      { name, date, impressions, clicks, conversions }
PUT    /api/campaigns/:id  { ...updatedData }
DELETE /api/campaigns/:id
```





