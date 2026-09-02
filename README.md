# QuickDash — Quick-Commerce Delivery Optimization Prototype

A full-stack mock quick-commerce platform that simulates an online shopping experience and demonstrates an intelligent delivery-mode selection and optimization system.

## Tech Stack
* **Framework:** Next.js 14+ (App Router) with TypeScript
* **Styling:** Tailwind CSS + Lucide React Icons
* **Database:** SQLite (`better-sqlite3`)
* **State Management:** Zustand
* **Routing / Weather APIs:** OSRM (Open Source Routing Machine), Open-Meteo
* **Map:** Leaflet (via React-Leaflet)

## Setup & Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Seed the database:**
   This generates the SQLite database with 400 realistic products.
   ```bash
   npx tsx src/db/seed.ts
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features
* **Dynamic Delivery Engine:** Calculates ETA, Cost, CO₂ emissions, and Mode Eligibility in real-time.
* **AI Recommendation Engine:** Multi-objective scoring based on user preference (Fastest, Cheapest, Sustainable, Balanced).
* **Developer Panel:** (`/admin`) Simulate weather, traffic, and fleet availability to stress-test the delivery engine.
* **End-to-End Flow:** Browse products, build a cart, test address serviceability, checkout, and view analytics.

## Documentation
* See `docs/DOCUMENTATION.md` for architecture and methodology.
* See `docs/ASSUMPTIONS.md` for the structured assumptions register.
