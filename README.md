FuelEU Maritime Compliance Platform

A full-stack application for monitoring, comparing, and managing maritime fuel emissions in compliance with the FuelEU Maritime Regulation. 
This system covers route tracking, compliance comparison, banking, and pooling — built using React, Node.js, TypeScript, Prisma, and PostgreSQL.

---

## Overview

This project was developed as part of the FuelEU Full Stack Developer Assignment to demonstrate:
- Clean Hexagonal Architecture (Ports & Adapters)
- Realistic domain-driven modeling
- Integration of frontend + backend + database
- Practical use of AI agents (ChatGPT GPT-5) for software development

---

## Architecture
```
Varuna/
├── backend/
│   ├── prisma/                # Prisma ORM schema & migrations
│   ├── src/
│   │   ├── core/              # Domain logic and use-cases
│   │   ├── adapters/
│   │   │   ├── inbound/http   # Express routes
│   │   │   └── outbound/      # Database adapter
│   │   └── infrastructure/    # Server configuration
│   ├── docker-compose.yml     # PostgreSQL setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── adapters/ui        # Tabs: Routes, Compare, Banking, Pooling
│   │   ├── App.tsx            # Main tab component
│   │   └── styles/            # Tailwind setup
│   └── vite.config.ts
│
├── AGENT_WORKFLOW.md          # Detailed AI usage log
├── README.md                  # This file
└── REFLECTION.md              # Personal reflection & learnings
```
---

## Tech Stack

### Frontend
- React (Vite + TypeScript)
- TailwindCSS
- Axios
- Recharts (for charts)

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL
- Docker
- Jest + Supertest
- TypeScript

---

## Setup & Run Instructions

### Prerequisites
- Node.js v20+
- npm v10+
- Docker Desktop running
- Git installed

---

### 1️⃣ Backend Setup
```
cd backend
npm install
docker compose up -d        # Starts PostgreSQL container
npx prisma migrate dev --name init
npm run seed                # Seeds initial route data
npm run dev                 # Runs server on port 4000

(Optional) Launch Prisma Studio:
npx prisma studio           # Opens at http://localhost:5555
```
---

### 2️⃣ Frontend Setup
```
cd frontend
npm install
npm run dev                 # Opens app at http://localhost:5173
```
---

## API Endpoints

| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| GET | /routes | Fetch all routes |
| POST | /routes/:id/baseline | Set a route as baseline |
| GET | /routes/comparison | Compare baseline vs other routes |
| GET | /compliance/cb?year=YYYY | Get Compliance Balance |
| POST | /banking/bank | Bank positive CB |
| POST | /banking/apply | Apply banked surplus |
| POST | /pools | Create and validate pooling |

---

## Frontend Features

### Routes
Displays all vessel routes with filters and the ability to set a baseline.

### Compare
Compares the baseline against other routes:
- Displays GHG intensity and % difference
- Marks compliance ✅/❌
- Includes a bar chart using Recharts

### Banking
Implements FuelEU Article 20 (Banking):
- Bank positive compliance balance
- Apply stored surplus to deficit

### Pooling
Implements Article 21 (Pooling):
- Validate members based on CB
- Ensure no member exits worse off
- Display pool sum indicator (red/green)

---

## Testing

### Run backend tests
```
cd backend
npm run test
```


Tests include:
- Compliance balance calculations
- Banking & pooling logic
- HTTP endpoint validation (Supertest)

---

## AI Agent Usage

This project was developed almost entirely with ChatGPT (GPT-5) as the AI coding partner.
ChatGPT generated code, guided installation, explained architectural choices, and helped debug npm, Prisma, and Docker errors.

See full documentation in AGENT_WORKFLOW.md.

---

## Author
Mohammad Tabseer
Built in collaboration with ChatGPT (GPT-5) for educational and evaluation purposes.
The project demonstrates end-to-end AI-assisted development, testing, and deployment readiness.

---

## Related Files
- AGENT_WORKFLOW.md → Logs of AI prompts and outputs
- REFLECTION.md → Personal summary of learning and AI usage
- README.md → Project overview and setup guide

---

## License
This project is provided for educational and demonstration purposes only.
All code was generated and refined collaboratively between human and AI.

> “This project proves how AI can accelerate software development when combined with human validation and debugging.”

