# Assumptions Register

This document outlines the key assumptions made in the delivery optimization engine. All variables can be modified in `src/config/delivery.ts`.

## 1. Vehicles
* **ICE (Petrol Scooter):**
  * Average Speed: 25 km/h (Typical Mumbai urban traffic).
  * Fuel Efficiency: 35 km/L (Standard 100-125cc scooter in stop-and-go traffic).
  * Payload: 20 kg max.
* **EV (Electric Scooter):**
  * Average Speed: 23 km/h (Slightly restricted for battery optimization).
  * Efficiency: 0.06 kWh/km (Typical Ather/Ola city riding).
  * Payload: 18 kg max.
* **Drones:**
  * Categorized into Small (1.5kg), Medium (3.5kg), Heavy (8kg).
  * Speed: 40-60 km/h (Straight line flight).
  * Grounded if Wind > 35 km/h or Rain > 5 mm/h.

## 2. Carbon Footprint (Indian Context)
* **ICE:** 2.31 kg CO₂ per liter of petrol (Standard IPCC emission factor).
* **Grid (EV/Drones):** 0.71 kg CO₂ per kWh (Central Electricity Authority, India average). 
* *Note: EVs and Drones are NOT zero-emission unless charged purely via renewables, which is not assumed here.*

## 3. Financials
* **Petrol:** ₹105 / Liter.
* **Commercial Electricity:** ₹8 / kWh.
* **Driver Cost:** ₹15 flat fee per delivery (excluding base salary).
* **Drone Operator:** ₹5 flat fee per delivery (remote monitoring of autonomous fleet).

## 4. Traffic Model
Since free live-traffic APIs for Mumbai do not exist, we model traffic using time-of-day multipliers:
* LOW (Night): 1.0x time multiplier
* MODERATE (Mid-day): 1.3x time multiplier
* HIGH (Peak hours): 1.6x time multiplier

## 5. Weather Penalties
* Light Rain: 15% ETA penalty for road vehicles, drones fly slower.
* Heavy Rain: 30% ETA penalty for road vehicles, drones grounded.
