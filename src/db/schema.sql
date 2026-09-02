-- SQLite Schema for Quick-Commerce Prototype

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  price REAL NOT NULL,
  mrp REAL NOT NULL,
  discount REAL NOT NULL,
  weight REAL NOT NULL,
  unit TEXT NOT NULL,
  packageLength REAL NOT NULL,
  packageWidth REAL NOT NULL,
  packageHeight REAL NOT NULL,
  volume REAL NOT NULL,
  stock INTEGER NOT NULL,
  lowStockThreshold INTEGER NOT NULL,
  rating REAL NOT NULL,
  reviewCount INTEGER NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT NOT NULL, -- Stored as JSON string
  isFragile BOOLEAN NOT NULL DEFAULT 0,
  isLiquid BOOLEAN NOT NULL DEFAULT 0,
  isTemperatureSensitive BOOLEAN NOT NULL DEFAULT 0,
  isHazardous BOOLEAN NOT NULL DEFAULT 0,
  droneEligible BOOLEAN NOT NULL DEFAULT 1,
  sustainabilityScore REAL NOT NULL
);

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  event_id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  event_name TEXT NOT NULL,
  page TEXT,
  product_id TEXT,
  category TEXT,
  cart_value REAL,
  order_weight REAL,
  order_volume REAL,
  customer_lat REAL,
  customer_long REAL,
  distance_km REAL,
  weather_condition TEXT,
  traffic_condition TEXT,
  delivery_mode TEXT,
  drone_type TEXT,
  estimated_eta REAL,
  delivery_cost REAL,
  estimated_operating_cost REAL,
  estimated_co2 REAL,
  customer_preference TEXT,
  recommended_mode TEXT,
  selected_mode TEXT
);

-- Completed Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  total_value REAL NOT NULL,
  delivery_fee REAL NOT NULL,
  operating_cost REAL NOT NULL,
  delivery_mode TEXT NOT NULL,
  drone_type TEXT,
  estimated_eta REAL NOT NULL,
  estimated_co2 REAL NOT NULL,
  distance_km REAL NOT NULL,
  customer_lat REAL NOT NULL,
  customer_long REAL NOT NULL,
  weather_condition TEXT,
  traffic_condition TEXT,
  customer_preference TEXT NOT NULL
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
