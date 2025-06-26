# 🧠 InterviewPrep - Full Stack Quiz & Learning App

A beautifully designed full-stack **Interview Preparation Web App** built using **React (TypeScript)** and **NestJS**, empowering users to **learn**, **practice**, and **master** core programming topics through curated learning content and interactive quizzes.

---

## 🚀 Features

### 📘 Learning Page
- Clean and modern **Glassmorphism UI**
- Grid of **10 core programming topics**:
  - HTML
  - CSS
  - JavaScript
  - TypeScript
  - React
  - Node.js
  - Python
  - Java
  - OOPS
  - DSA
- On hover: **"Learn"** and **"Start Quiz"** buttons for each topic
- Hyper-detailed learning content for all topics with examples

### 🧪 Quiz System
- **Topic-wise quizzes** with 50 multiple-choice questions per topic
- **All-in-One Quiz** with 5 randomized questions across all topics
- Each question contains:
  - A question prompt
  - Four multiple-choice options
  - One correct answer
- Score tracking and instant results at quiz end

### ⚙️ Backend API
- Built using **NestJS**
- API endpoints for:
  - Fetching questions by topic
  - Fetching random questions from all topics
  - Fetching learning content by topic
- Modular architecture with DTOs and services

### 🧑‍💻 Frontend
- Built using **React + TypeScript**
- Responsive, modern UI using **Tailwind CSS**
- Component-based architecture
- React Router for navigation
- Axios for API communication

---

## 🧱 Project Structure

### Frontend (React + TypeScript)
client/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── utils/
│ ├── App.tsx
│ └── main.tsx

shell
Copy
Edit

### Backend (NestJS)
server/
├── src/
│ ├── app.controller.ts
│ ├── app.service.ts
│ ├── app.module.ts
│ ├── main.ts
│ ├── questions/
│ │ ├── questions.controller.ts
│ │ ├── questions.service.ts
│ │ ├── questions.module.ts
│ │ └── questions.dto.ts
│ ├── learning/
│ │ ├── learning.controller.ts
│ │ ├── learning.service.ts
│ │ ├── learning.module.ts

yaml
Copy
Edit

---

## 📚 Topics Covered

Each topic includes:
- Concepts & definitions
- Syntax and code examples
- Best practices
- Interview-specific guidance

**Included Topics:**
- ✅ HTML
- ✅ CSS
- ✅ JavaScript
- ✅ TypeScript
- ✅ React
- ✅ Node.js
- ✅ Python
- ✅ Java
- ✅ OOPS
- ✅ DSA

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- NestJS
- TypeScript
- Express (under the hood)
- Class-Validator
- UUID

---

## 🖥️ Screenshots

| 🏠 Home | 📘 Learning Page | ❓ Quiz Page |
|--------|------------------|--------------|
| ![Home](./screenshots/home.png) | ![Learn](./screenshots/learn.png) | ![Quiz](./screenshots/quiz.png) |

---

## 🌐 Getting Started

### 🔧 Prerequisites
- Node.js (v18+)
- npm or yarn

### 🔄 Clone the Repository

```bash
git clone https://github.com/your-username/interview-prep-app.git
cd interview-prep-app
🧑‍💻 Running the Project
Frontend (Client)
bash
Copy
Edit
cd client
npm install
npm run dev
Backend (Server)
bash
Copy
Edit
cd server
npm install
npm run start:dev
🔗 Frontend: http://localhost:5173
🔗 Backend API: http://localhost:5000

🔌 API Endpoints
Questions API
GET /questions/:topic → Get all quiz questions by topic

GET /questions/allinone → Get 5 random questions from all topics

Learning API
GET /learning/:topic → Get structured learning content for a topic

🧪 Sample Question Format (JSON)
json
Copy
Edit
{
  "question": "What is the output of console.log(typeof null)?",
  "options": ["object", "null", "undefined", "number"],
  "answer": "object"
}
🛠️ Enhancements in Progress
 User authentication and login

 Timer-based quiz mode

 Admin dashboard to manage content

 Leaderboard and scoring history

 Code execution snippets (coming soon!)

💡 Inspiration
This app was born from the need for a centralized, interactive platform to revise programming fundamentals for interviews. Rather than sifting through scattered resources, InterviewPrep offers a structured, user-friendly solution to prepare with confidence.

🤝 Contributing
Contributions, suggestions, and PRs are welcome!
Please fork the repo and submit a pull request with improvements or ideas.

📄 License
This project is licensed under the MIT License.

📬 Contact
Created by Hemanth Mangala

📧 Email: hemanth.email@example.com

🔗 LinkedIn: linkedin.com/in/hemanthmangala

🌐 Portfolio: hemanthmangala.dev

⭐ Star this repo if you found it useful!
yaml
Copy
Edit

---

Let me know if you want me to:
- Create a `screenshots/` folder with placeholders for image files
- Add GitHub badges (e.g., license, build, issues)
- Help push this to your actual GitHub repo or deploy it live

Just say the word!
