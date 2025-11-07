# Reflection: Building the FuelEU Maritime Compliance Platform

## 💡 Overview
This project was a full-stack application built to simulate a real-world compliance platform for the **FuelEU Maritime Regulation**, focusing on tracking, comparing, and managing vessel emissions and compliance metrics.

The system involved a **backend** built with Node.js, Express, Prisma, and PostgreSQL, and a **frontend** developed in React + TypeScript using Tailwind CSS and Vite.

Throughout the development process, I collaborated heavily with **ChatGPT (GPT-5)** to understand, design, implement, debug, and document every part of the project.

---

## 🧠 My Development Process

### 1. **Initial Setup**
I began by cloning the base structure, setting up **Node.js**, **npm**, and **PostgreSQL** using Docker.  
ChatGPT guided me step-by-step through installation and configuration issues, including fixing:
- PATH issues with `npm`
- Prisma migrations
- Docker Compose connection errors

### 2. **Backend Development**
The backend was organized using **Hexagonal Architecture (Ports & Adapters)**.
- `routes.ts` handled CRUD and compliance routes.
- `banking.ts`, `pooling.ts`, and `compliance.ts` handled domain logic.
- Prisma was used to manage models for `Route`, `Pool`, and `BankEntry`.
- API endpoints were built and tested using **Postman** and **Supertest**.

#### Debugging Help
ChatGPT helped fix:
- TypeScript implicit `any` type errors  
- Missing modules (`express`, `cors`, `@prisma/client`)  
- Prisma migration mismatches  
- Docker network setup issues

---

### 3. **Frontend Development**
The frontend was built using:
- **React (Vite)** for the framework  
- **Tailwind CSS** for styling  
- **Axios** for backend communication  
- **Recharts** for visual data comparison  

Tabs were created for:
- `Routes` → Viewing and setting baselines  
- `Compare` → Displaying compliance vs. baseline  
- `Banking` → Managing compliance balance  
- `Pooling` → Validating multi-ship compliance pools  

I referenced ChatGPT for **API integration**, **React state handling**, and **UI component logic**.

---

### 4. **Testing & Verification**
I executed backend tests using Jest and Supertest.  
Frontend was manually tested in the browser for data synchronization with the API.

ChatGPT also explained test case structures, async handling in Jest, and mocking API responses.

---

### 5. **Final Integration**
When connecting frontend and backend:
- I had both running concurrently (`localhost:4000` and `localhost:5173`)
- Prisma Studio was used to visualize database content.
- Once everything worked, I validated all CRUD and compliance operations.

The app was fully functional:
✅ Backend API  
✅ Database connection  
✅ Frontend dashboard  
✅ Route comparison & visualization

---

## 🤖 Role of ChatGPT (GPT-5)

### What ChatGPT Did
- Generated code for **Express routes, Prisma schema, and React components**  
- Helped resolve **npm**, **TypeScript**, and **Prisma migration** errors  
- Provided **step-by-step debugging** instructions for every issue  
- Structured **documentation** and **README files**  
- Assisted with **Git and GitHub setup**

### What I Did
- Followed all commands manually  
- Installed, configured, and debugged environment issues  
- Verified API functionality  
- Adjusted minor bugs in logic and alignment  
- Managed and tested the final working application  

So this was a **hybrid build** — code written with AI, validated and implemented by me.

---

## 🧩 Key Learnings

1. **AI can accelerate development**, but understanding is still crucial.  
2. Setting up environments (Node, Docker, Prisma) taught me patience and problem-solving.  
3. Learned how **frontend and backend communicate** effectively using REST APIs.  
4. Understood **TypeScript strictness** and how to manage typing properly.  
5. Prisma ORM and migrations gave me practical insight into database management.  
6. Debugging via ChatGPT responses improved my **technical explanation and reasoning**.

---

## 🧭 Challenges Faced
- `npm not recognized` → fixed by editing PATH manually.  
- `Docker connection refused` → solved by restarting Docker Desktop.  
- `Prisma generate` failed → resolved by reinstalling correct Prisma version.  
- Git push errors (`index.lock`) → deleted lock file manually.

Each of these was solved with ChatGPT’s assistance, and I made sure to understand every command before executing.

---

## 🧾 Final Thoughts

This project wasn’t just about completing an assignment — it was about learning **how to work with AI as a development partner**.  
Every bug, command, and configuration taught me something about real-world software engineering.

I can now:
- Confidently use Prisma, Docker, and PostgreSQL together  
- Understand full-stack data flow  
- Write, debug, and deploy TypeScript-based systems  
- Collaborate efficiently with AI tools like ChatGPT

---

## 🙌 Credits
**Developed by:** Mohammad Tabseer  
**Guided & Co-developed with:** ChatGPT (GPT-5)  
**Purpose:** Educational — AI-assisted Software Engineering Demonstration  
**Date:** November 2025

> “I used ChatGPT for every major part of this project — from setup to final debugging — but I made sure to understand and verify each step myself.”
