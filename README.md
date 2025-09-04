# 🏆 Quiz Master  

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://dh5uaxfjzwbbq.cloudfront.net/
)

An **interactive quiz app** built with **React.js + Vite** 🎯  
Answer **10 timed questions** ⏳, test your knowledge, and get instant results with a clean & modern UI.  

---

## ✨ Features  

✅ Choose **difficulty level** – Easy | Medium | Hard  
✅ **10 Questions** per quiz  
✅ **30 Seconds timer** for each question  
✅ Live **score tracking & progress bar**  
✅ **Previous / Next navigation**  
✅ **Detailed Results Page** with correct vs wrong answers  
✅ **Responsive & modern UI** (TailwindCSS + Lucide Icons)  
✅ Fetches data from **[Open Trivia Database](https://opentdb.com/)**  

---

## 📂 Project Structure  
```
frontend/
├── src/
│   ├── components/       # Navbar, Footer
│   ├── pages/            # EntryCard, QuestionPage, ShowResults
│   ├── App.jsx           # Main routes + state management
│   ├── main.jsx          # Vite entry point
│   └── App.css           # Styles
├── public/               # Static assets
├── package.json
└── vite.config.js
```



---

## ⚙️ Installation & Setup  

### 🔹 1. Clone Repository  
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd frontend
```

## 🔹2. Install Dependencies
```
npm install
```

## 🔹 3. Start Development Server
```
npm run dev
```


👉 Runs at http://localhost:5173

## 🔹 4. Build for Production
```
npm run build
```

## 🔹 5. Preview Production Build
```
npm run preview

```
## 🏗️ Architecture  

The project follows a **component-based architecture** using **React + Vite** for fast development and modular code.  

- **React Router v6** → Handles navigation between pages (`EntryCard`, `QuestionPage`, `ShowResults`)  
- **Component-based structure** → Reusable UI parts like `Navbar`, `Footer`  
- **State management (useState + props)** → Quiz state (score, current question, difficulty) is stored in the parent (`App.jsx`) and passed down  
- **API Layer (Axios)** → Fetches quiz questions from [Open Trivia Database](https://opentdb.com/)  
- **TailwindCSS** → Utility-first styling for responsiveness  
- **Lucide Icons** → Lightweight icons for clean UI  

---

## 🧠 Design Decisions  

1. **Vite instead of CRA** ⚡  
   - Chosen for **faster build times**, lightweight bundling, and modern ES6 support.  

2. **Component Splitting** 🧩  
   - Pages are separated (`EntryCard`, `QuestionPage`, `ShowResults`) for **readability and reusability**.  
   - Common UI elements (`Navbar`, `Footer`) are isolated into `components/`.  

3. **State Management in Parent** 🎯  
   - Quiz logic (score, timer, current index) is kept in `App.jsx` → avoids prop-drilling issues across multiple components.  

4. **Timer per Question** ⏳  
   - Each question is limited to **30 seconds** → prevents idle waiting and makes quiz more engaging.  

5. **Responsive UI with TailwindCSS** 📱  
   - Chosen to ensure quiz works on **desktop, tablet, and mobile** without writing custom media queries.  

6. **API-driven Questions** 🌍  
   - Dynamic questions from Open Trivia DB ensure **fresh quizzes** every play, rather than hardcoding data.  

---

## 🎮 How to Play

1️⃣ Select a difficulty (Easy / Medium / Hard)
2️⃣ Click Start Quiz ⚡
3️⃣ Answer each question within 30s ⏳
4️⃣ Use Next / Previous to navigate
5️⃣ Submit & see your score breakdown 🎉## 🎮 How to Play  

1️⃣ Select a **difficulty** (Easy / Medium / Hard)  
2️⃣ Click **Start Quiz** ⚡  
3️⃣ Answer each question within **30s** ⏳  
4️⃣ Use **Next / Previous** to navigate  
5️⃣ Submit & see your **score breakdown** 🎉  

---  


## 🛠️ Tech Stack

⚛️ React.js (Vite)

🎨 TailwindCSS

🔄 React Router v6

📡 Axios (API calls)

🎭 Lucide React Icons

## 👨‍💻 Author  

**Astitva Sharma**  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/astitva-sharma-012b4b252/)  
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/Astitvazz)
