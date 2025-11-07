# AI Agent Workflow Log

## 🧠 Summary
This entire FuelEU Maritime Compliance Platform was built collaboratively with ChatGPT (GPT-5).  
I used ChatGPT for **code generation, architecture planning, debugging, installation guidance, and explanation of issues**, while occasionally applying my own reasoning for debugging and adaptation.

---

## 🤖 Agents Used
- **ChatGPT (GPT-5)** — main agent for full project implementation and guidance.
- **Human (me)** — reviewed, tested, debugged, and corrected AI-generated outputs as needed.

---

## 💬 Prompts & Outputs

### Prompt 1
> “Can you complete this FuelEU Maritime full-stack developer assignment?”

**Output:**  
ChatGPT generated the complete system design with clear folder structures for backend (Node + Prisma + PostgreSQL) and frontend (React + Tailwind + TypeScript), using Hexagonal Architecture.

---

### Prompt 2
> “Help me install and set up Node.js, npm, PostgreSQL, Docker, and Prisma step-by-step.”

**Output:**  
Detailed environment setup instructions were provided including Node.js PATH configuration, Docker Compose YAML for Postgres, Prisma migration and seeding setup, and verification steps using `npx prisma studio`.

**Validation:**  
All steps were followed successfully; backend connected to database and Prisma Studio showed seeded routes.

---

### Prompt 3
> “Debug this npm / prisma / docker / tsconfig / CORS error.”

**Output:**  
ChatGPT identified issues such as:
- missing `cors` dependency
- incorrect PATH configuration for npm
- Prisma schema version mismatches
- `index.lock` git issue  

Each was solved successfully by applying ChatGPT’s fixes.

---

### Prompt 4
> “Implement the React frontend (Routes, Compare, Banking, Pooling tabs) in a humanized, modular, and simple style.”

**Output:**  
ChatGPT provided all frontend files:
- `RoutesTab.tsx` — routes table with filters and baseline logic  
- `CompareTab.tsx` — baseline vs comparison visualization (chart + table)  
- `BankingTab.tsx` — Article 20 banking UI and logic  
- `PoolingTab.tsx` — pooling logic and validation  

**Validation:**  
Each feature worked as intended when backend APIs were live.

---

## 🧩 Validation / Corrections
- Verified each endpoint manually in the browser and Prisma Studio (`http://localhost:4000/routes`, `/comparison`, etc.)
- Debugged backend issues like version mismatches (`supertest@6.4.4` → resolved via `npm install` and cache clean).
- Manually fixed front-end UI spacing and tested Chart rendering.

---

## 🔍 Observations

### Where ChatGPT saved time
- Generated entire backend and frontend structure in minutes.
- Provided ready-to-use Prisma and Express boilerplate.
- Step-by-step Docker, Prisma, and npm troubleshooting.
- Reduced setup confusion and installation errors.

### Where manual effort was needed
- Fixing minor npm and Prisma version mismatches.
- Adjusting ports and CORS config manually.
- Testing each route’s response and verifying frontend-backend sync.

### Where ChatGPT hallucinated or failed
- Sometimes referenced older Prisma syntax (fixed manually).
- Occasionally produced minor mismatches in API response fields (corrected by testing).
- Suggested non-existent versions of `supertest`.
- Suggested non-required fixes such as changing project directory.

---

## 💡 Best Practices Followed
- Maintained **hexagonal separation**: core ↔ adapters.
- Used **strict TypeScript** for both frontend and backend.
- Validated all agent outputs via local tests and manual UI checks.
- Used ChatGPT iteratively: each prompt refined based on real results.

---

## 💭 Reflection Summary
> “Since I am more inclined towards problem solving and Machine learning (I am not into development but I like to use my brain), I took this project as a challenge and, completely used ChatGPT for this project — from architecture to debugging. My main contribution was understanding, testing, and debugging the generated code when needed. ChatGPT acted like my coding partner, and I verified each step manually to ensure everything worked end-to-end.”

