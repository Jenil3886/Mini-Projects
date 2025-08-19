Fullstack Blog Mini (Backend + Frontend)
- Backend: ./backend (Express + Sequelize + MySQL)
- Frontend: ./frontend (Vite + React + Tailwind)

Start backend:
  cd backend
  cp .env.example .env
  fill DB credentials
  npm install
  npm run dev

Start frontend:
  cd frontend
  npm install
  npm run dev

The frontend proxies /api to backend on localhost:4000 via vite.config.js
