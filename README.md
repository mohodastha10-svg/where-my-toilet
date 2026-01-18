# Fullstack Example: React → Express → MongoDB

Quick guide to run the example in this workspace.

Backend (Backend/)
- Copy `Backend/.env.example` to `Backend/.env` and set `MONGO_URI`.
- Install and run:

```bash
cd Backend
npm install
npm run dev   # or npm start
```

Frontend (frontend/)
- Install and run Vite dev server:

```bash
cd frontend
npm install
npm run dev
```

Notes
- Backend exposes `POST /api/users` to save a user document (name, email).
- Database credentials must be placed in `Backend/.env` as `MONGO_URI`.
