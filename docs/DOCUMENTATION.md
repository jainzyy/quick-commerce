# Quick-Commerce Delivery Optimization System

## 1. Goal of the Project
To demonstrate a comprehensive, multi-objective delivery mode selection engine for quick-commerce platforms. The engine evaluates ICE vehicles, EVs, and Drones against real-time operational constraints (weather, traffic, fleet capacity) and product characteristics (weight, dimensions, fragility).

## 2. Methodology

The delivery calculation engine follows a strict sequence of validations and calculations:
1. **Serviceability Check:** Is the customer within the 5 km radius of the Dark Store? (Haversine formula)
2. **Routing:** Fetch exact road distance and duration via OSRM.
3. **Environment Checks:** Fetch live weather (Open-Meteo) and determine traffic state.
4. **Package Profiling:** Calculate total weight, volume, and constraints (fragility, liquids).
5. **Eligibility Filtering:** Eliminate modes that cannot fulfill the order (e.g., Drones cannot carry > 8kg, ICE unavailable if fleet is 0).
6. **Cost, ETA & Carbon Calculation:** Compute internal costs, customer fees, delivery time, and CO₂ footprint.
7. **Scoring & Recommendation:** Normalize metrics to a 0-1 scale and apply user-selected preference weights to find the optimal mode.

## 3. Data Flow Diagram
*(Also available in the `implementation_plan.md` artifact)*
1. Checkout triggered → Client requests `/api/delivery/calculate`
2. Engine fetches live weather & routing.
3. Package metrics are computed from cart state.
4. Options are filtered, calculated, and scored.
5. Client renders UI. User selects mode & pays.
6. `/api/orders` processes payment, logs to DB, and sends analytics event.

## 4. Why SQLite?
A local SQLite database (via `better-sqlite3`) provides the robustness of a relational database (transactions, SQL queries, relational integrity) without requiring external setup for the evaluator. It easily handles thousands of product rows and analytics events.

## 5. Next.js App Router Architecture
The project heavily utilizes React Server Components for fast data fetching (e.g., `ProductPage` and `HomePage`), while isolating interactive state to Client Components (e.g., `CartPage` and `CheckoutPage`). Zustand is used for client-side persistence (cart contents and user session).

## 6. How Recommendations Work
We use **Min-Max Normalization** for multi-objective scoring. 
- A metric like "ETA" is normalized so that the lowest ETA gets a score of 1.0, and the highest gets 0.0.
- The normalized scores are multiplied by weight coefficients (e.g., FASTEST preference puts 60% weight on ETA).
- The highest total score becomes the "AI Recommended" option.
