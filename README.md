# 🔐 Node.js Auth API with JWT & File Upload

A simple Node.js API for user authentication using JWT and image upload functionality using Multer.

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **JWT** (jsonwebtoken)
- **Multer** (for image/file upload)
- **PM2** (optional for production)
- **AWS EC2** (for deployment)

---

## 📦 Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/auth-api.git
cd auth-api

# 2. Install dependencies
npm install


☁️ Deployment
This app can be deployed easily on an AWS EC2 instance:

Create EC2 Ubuntu instance

SSH into it and clone this repo

Install Node.js & PM2

Run npm install and pm2 start ./bin/www --name BE
