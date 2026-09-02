import json
import random
import os

categories_config = {
    "Grocery": {"prefix": "GRO", "count": 70, "templates": [
        {"name": "Basmati Rice", "brands": ["Daawat", "India Gate", "Kohinoor", "Patanjali"], "sub": "Rice", "price_range": (150, 250), "unit": "kg", "weight": 1000, "dims": (20, 15, 5), "isF": False, "isL": False, "isT": False, "image": "🍚"},
        {"name": "Sona Masoori Rice", "brands": ["Tenali Double Horse", "Patanjali", "Tata Sampann"], "sub": "Rice", "price_range": (60, 90), "unit": "kg", "weight": 1000, "dims": (20, 15, 5), "isF": False, "isL": False, "isT": False, "image": "🍚"},
        {"name": "Chakki Fresh Atta", "brands": ["Aashirvaad", "Pillsbury", "Fortune", "Patanjali"], "sub": "Flour/Atta", "price_range": (40, 60), "unit": "kg", "weight": 1000, "dims": (25, 20, 10), "isF": False, "isL": False, "isT": False, "image": "🌾"},
        {"name": "Maida", "brands": ["Rajdhani", "Ganesh", "Fortune"], "sub": "Flour/Atta", "price_range": (40, 50), "unit": "kg", "weight": 1000, "dims": (20, 15, 5), "isF": False, "isL": False, "isT": False, "image": "🌾"},
        {"name": "Toor Dal", "brands": ["Tata Sampann", "Fortune", "Organic Tattva"], "sub": "Pulses/Dal", "price_range": (140, 180), "unit": "kg", "weight": 1000, "dims": (20, 15, 5), "isF": False, "isL": False, "isT": False, "image": "🍛"},
        {"name": "Moong Dal", "brands": ["Tata Sampann", "Patanjali", "Organic Tattva"], "sub": "Pulses/Dal", "price_range": (100, 140), "unit": "kg", "weight": 1000, "dims": (20, 15, 5), "isF": False, "isL": False, "isT": False, "image": "🍛"},
        {"name": "Sunflower Oil", "brands": ["Fortune", "Saffola", "Dhara", "Gemini", "Gold Drop"], "sub": "Oils", "price_range": (120, 160), "unit": "L", "weight": 920, "dims": (10, 10, 25), "isF": False, "isL": True, "isT": False, "image": "🛢️"},
        {"name": "Mustard Oil", "brands": ["Fortune", "Patanjali", "Dhara", "Engine"], "sub": "Oils", "price_range": (140, 190), "unit": "L", "weight": 920, "dims": (10, 10, 25), "isF": False, "isL": True, "isT": False, "image": "🛢️"},
        {"name": "Turmeric Powder", "brands": ["MDH", "Everest", "Catch", "Ramdev", "Patanjali"], "sub": "Spices", "price_range": (30, 40), "unit": "g", "weight": 100, "dims": (10, 8, 2), "isF": False, "isL": False, "isT": False, "image": "🥣"},
        {"name": "Garam Masala", "brands": ["MDH", "Everest", "Catch", "Tata Sampann"], "sub": "Spices", "price_range": (60, 90), "unit": "g", "weight": 100, "dims": (10, 8, 2), "isF": False, "isL": False, "isT": False, "image": "🥣"},
        {"name": "Salt", "brands": ["Tata", "Aashirvaad", "Patanjali", "Nirma"], "sub": "Sugar/Salt/Jaggery", "price_range": (20, 30), "unit": "kg", "weight": 1000, "dims": (15, 10, 5), "isF": False, "isL": False, "isT": False, "image": "🧂"},
        {"name": "Sugar", "brands": ["Madhur", "Parrys", "Uttam"], "sub": "Sugar/Salt/Jaggery", "price_range": (45, 55), "unit": "kg", "weight": 1000, "dims": (20, 15, 5), "isF": False, "isL": False, "isT": False, "image": "🧂"},
        {"name": "Oats", "brands": ["Quaker", "Saffola", "Kellogg's", "Yoga Bar"], "sub": "Breakfast", "price_range": (150, 200), "unit": "g", "weight": 1000, "dims": (20, 15, 10), "isF": False, "isL": False, "isT": False, "image": "🥣"},
        {"name": "Instant Noodles", "brands": ["Maggi", "Yippee", "Top Ramen", "Wai Wai"], "sub": "Ready-to-eat", "price_range": (14, 28), "unit": "g", "weight": 140, "dims": (15, 10, 5), "isF": True, "isL": False, "isT": False, "image": "🍜"},
        {"name": "Tomato Soup", "brands": ["Knorr", "Maggi", "Ching's"], "sub": "Ready-to-eat", "price_range": (50, 65), "unit": "g", "weight": 55, "dims": (12, 10, 2), "isF": False, "isL": False, "isT": False, "image": "🍲"},
    ]},
    "Fruits & Vegetables": {"prefix": "FRV", "count": 40, "templates": [
        {"name": "Onion", "brands": ["Fresh Farms", "Safal", "Local"], "sub": "Fresh vegetables", "price_range": (30, 60), "unit": "kg", "weight": 1000, "dims": (25, 20, 10), "isF": False, "isL": False, "isT": False, "image": "🧅"},
        {"name": "Potato", "brands": ["Fresh Farms", "Safal", "Local"], "sub": "Fresh vegetables", "price_range": (20, 40), "unit": "kg", "weight": 1000, "dims": (25, 20, 10), "isF": False, "isL": False, "isT": False, "image": "🥔"},
        {"name": "Tomato", "brands": ["Fresh Farms", "Safal", "Local"], "sub": "Fresh vegetables", "price_range": (20, 80), "unit": "kg", "weight": 1000, "dims": (25, 20, 10), "isF": True, "isL": False, "isT": True, "image": "🍅"},
        {"name": "Apple (Fuji)", "brands": ["Washington", "Kinnaur", "Local"], "sub": "Fresh fruits", "price_range": (150, 250), "unit": "kg", "weight": 1000, "dims": (25, 20, 10), "isF": True, "isL": False, "isT": True, "image": "🍎"},
        {"name": "Banana (Robusta)", "brands": ["Fresh Farms", "Local"], "sub": "Fresh fruits", "price_range": (40, 60), "unit": "kg", "weight": 1000, "dims": (25, 20, 10), "isF": True, "isL": False, "isT": True, "image": "🍌"},
        {"name": "Coriander Leaves", "brands": ["Fresh Farms", "Local"], "sub": "Herbs", "price_range": (10, 20), "unit": "g", "weight": 100, "dims": (15, 10, 5), "isF": False, "isL": False, "isT": True, "image": "🌿"},
        {"name": "Spinach (Palak)", "brands": ["Fresh Farms", "Local"], "sub": "Leafy greens", "price_range": (15, 30), "unit": "g", "weight": 250, "dims": (20, 15, 5), "isF": False, "isL": False, "isT": True, "image": "🥬"},
        {"name": "Carrot", "brands": ["Fresh Farms", "Local"], "sub": "Fresh vegetables", "price_range": (40, 60), "unit": "kg", "weight": 1000, "dims": (25, 15, 10), "isF": False, "isL": False, "isT": True, "image": "🥕"},
        {"name": "Garlic", "brands": ["Fresh Farms", "Local"], "sub": "Fresh vegetables", "price_range": (80, 150), "unit": "g", "weight": 250, "dims": (10, 10, 5), "isF": False, "isL": False, "isT": False, "image": "🧄"},
        {"name": "Ginger", "brands": ["Fresh Farms", "Local"], "sub": "Fresh vegetables", "price_range": (30, 60), "unit": "g", "weight": 250, "dims": (10, 10, 5), "isF": False, "isL": False, "isT": False, "image": "🫚"},
    ]},
    "Dairy & Eggs": {"prefix": "DAI", "count": 35, "templates": [
        {"name": "Toned Milk", "brands": ["Amul", "Mother Dairy", "Nandini", "Milma", "Aavin"], "sub": "Milk", "price_range": (25, 35), "unit": "ml", "weight": 520, "dims": (15, 15, 5), "isF": False, "isL": True, "isT": True, "image": "🥛"},
        {"name": "Full Cream Milk", "brands": ["Amul", "Mother Dairy", "Nandini"], "sub": "Milk", "price_range": (30, 40), "unit": "ml", "weight": 520, "dims": (15, 15, 5), "isF": False, "isL": True, "isT": True, "image": "🥛"},
        {"name": "Curd/Dahi", "brands": ["Amul", "Mother Dairy", "Nestle", "Milky Mist"], "sub": "Curd/Yogurt", "price_range": (30, 45), "unit": "g", "weight": 400, "dims": (10, 10, 10), "isF": False, "isL": False, "isT": True, "image": "🥣"},
        {"name": "Salted Butter", "brands": ["Amul", "Mother Dairy", "Nutralite"], "sub": "Butter/Ghee", "price_range": (50, 65), "unit": "g", "weight": 100, "dims": (10, 6, 4), "isF": False, "isL": False, "isT": True, "image": "🧈"},
        {"name": "Pure Cow Ghee", "brands": ["Amul", "Patanjali", "Gowardhan", "Aashirvaad", "Mother Dairy"], "sub": "Butter/Ghee", "price_range": (250, 350), "unit": "ml", "weight": 500, "dims": (10, 10, 15), "isF": False, "isL": True, "isT": False, "image": "🏺"},
        {"name": "Cheese Slices", "brands": ["Amul", "Britannia", "Go Cheese"], "sub": "Cheese", "price_range": (120, 150), "unit": "g", "weight": 200, "dims": (10, 10, 2), "isF": False, "isL": False, "isT": True, "image": "🧀"},
        {"name": "Fresh Paneer", "brands": ["Amul", "Mother Dairy", "Milky Mist", "Gowardhan"], "sub": "Paneer", "price_range": (70, 95), "unit": "g", "weight": 200, "dims": (12, 8, 4), "isF": False, "isL": False, "isT": True, "image": "🧀"},
        {"name": "Farm Fresh Eggs", "brands": ["Suguna", "Eggoz", "Ayur", "SKM"], "sub": "Eggs", "price_range": (40, 60), "unit": "pcs", "weight": 300, "dims": (15, 10, 5), "isF": True, "isL": False, "isT": True, "image": "🥚"},
    ]},
    "Beverages": {"prefix": "BEV", "count": 40, "templates": [
        {"name": "Mineral Water", "brands": ["Bisleri", "Kinley", "Aquafina", "Bailley"], "sub": "Water", "price_range": (20, 20), "unit": "L", "weight": 1000, "dims": (8, 8, 30), "isF": False, "isL": True, "isT": False, "image": "💧"},
        {"name": "Cola Drink", "brands": ["Coca-Cola", "Pepsi", "Thums Up", "Campa Cola"], "sub": "Soft drinks", "price_range": (35, 45), "unit": "ml", "weight": 750, "dims": (7, 7, 25), "isF": False, "isL": True, "isT": False, "image": "🥤"},
        {"name": "Lemon Drink", "brands": ["Sprite", "7UP", "Limca", "Mountain Dew"], "sub": "Soft drinks", "price_range": (35, 45), "unit": "ml", "weight": 750, "dims": (7, 7, 25), "isF": False, "isL": True, "isT": False, "image": "🥤"},
        {"name": "Mango Juice", "brands": ["Frooti", "Maaza", "Slice", "Tropicana", "Real"], "sub": "Juices", "price_range": (60, 75), "unit": "L", "weight": 1050, "dims": (8, 8, 25), "isF": False, "isL": True, "isT": False, "image": "🧃"},
        {"name": "Energy Drink", "brands": ["Red Bull", "Monster", "Sting"], "sub": "Energy drinks", "price_range": (50, 115), "unit": "ml", "weight": 260, "dims": (5, 5, 15), "isF": False, "isL": True, "isT": False, "image": "⚡"},
        {"name": "Premium Tea", "brands": ["Tata Tea", "Brooke Bond", "Wagh Bakri", "Tetley"], "sub": "Tea", "price_range": (120, 180), "unit": "g", "weight": 250, "dims": (10, 10, 15), "isF": False, "isL": False, "isT": False, "image": "☕"},
        {"name": "Instant Coffee", "brands": ["Nescafe", "Bru", "Tata Coffee"], "sub": "Coffee", "price_range": (140, 180), "unit": "g", "weight": 50, "dims": (6, 6, 12), "isF": True, "isL": False, "isT": False, "image": "☕"},
        {"name": "Malt Health Drink", "brands": ["Bournvita", "Horlicks", "Complan", "Boost"], "sub": "Health drinks", "price_range": (180, 250), "unit": "g", "weight": 500, "dims": (10, 10, 15), "isF": False, "isL": False, "isT": False, "image": "🥛"},
    ]},
    "Snacks": {"prefix": "SNK", "count": 50, "templates": [
        {"name": "Potato Chips", "brands": ["Lay's", "Bingo", "Balaji", "Haldiram's", "Uncle Chipps"], "sub": "Chips", "price_range": (10, 30), "unit": "g", "weight": 50, "dims": (15, 10, 5), "isF": True, "isL": False, "isT": False, "image": "🥔"},
        {"name": "Digestive Biscuits", "brands": ["Britannia", "Parle", "Sunfeast", "Patanjali"], "sub": "Biscuits", "price_range": (40, 60), "unit": "g", "weight": 250, "dims": (20, 8, 8), "isF": True, "isL": False, "isT": False, "image": "🍪"},
        {"name": "Glucose Biscuits", "brands": ["Parle", "Britannia", "Sunfeast"], "sub": "Biscuits", "price_range": (10, 30), "unit": "g", "weight": 100, "dims": (15, 5, 5), "isF": True, "isL": False, "isT": False, "image": "🍪"},
        {"name": "Milk Chocolate", "brands": ["Cadbury", "Nestle", "Amul", "Hershey's"], "sub": "Chocolates", "price_range": (20, 100), "unit": "g", "weight": 50, "dims": (10, 5, 1), "isF": True, "isL": False, "isT": True, "image": "🍫"},
        {"name": "Bhujia Sev", "brands": ["Haldiram's", "Bikano", "Balaji", "Bikanervala"], "sub": "Namkeen/Mixtures", "price_range": (40, 60), "unit": "g", "weight": 200, "dims": (15, 10, 4), "isF": True, "isL": False, "isT": False, "image": "🥨"},
        {"name": "Moong Dal Namkeen", "brands": ["Haldiram's", "Bikano", "Balaji"], "sub": "Namkeen/Mixtures", "price_range": (40, 60), "unit": "g", "weight": 200, "dims": (15, 10, 4), "isF": True, "isL": False, "isT": False, "image": "🥨"},
        {"name": "Almonds", "brands": ["Happilo", "Tulsi", "Rostaa", "Nutraj"], "sub": "Nuts/Dry fruits", "price_range": (250, 400), "unit": "g", "weight": 200, "dims": (15, 10, 4), "isF": False, "isL": False, "isT": False, "image": "🥜"},
        {"name": "Cashews", "brands": ["Happilo", "Tulsi", "Rostaa", "Nutraj"], "sub": "Nuts/Dry fruits", "price_range": (300, 500), "unit": "g", "weight": 200, "dims": (15, 10, 4), "isF": False, "isL": False, "isT": False, "image": "🥜"},
        {"name": "Rasgulla", "brands": ["Haldiram's", "Bikano", "MTR"], "sub": "Sweets", "price_range": (150, 250), "unit": "kg", "weight": 1000, "dims": (15, 15, 15), "isF": True, "isL": True, "isT": False, "image": "🍬"},
    ]},
    "Personal Care": {"prefix": "PER", "count": 45, "templates": [
        {"name": "Anti-Dandruff Shampoo", "brands": ["Head & Shoulders", "Dove", "Pantene", "Clear", "Clinic Plus"], "sub": "Shampoo", "price_range": (140, 220), "unit": "ml", "weight": 200, "dims": (6, 4, 15), "isF": False, "isL": True, "isT": False, "image": "🧴"},
        {"name": "Beauty Bathing Bar", "brands": ["Dove", "Lux", "Pears", "Cinthol", "Santoor", "Lifebuoy"], "sub": "Soap/Body wash", "price_range": (40, 60), "unit": "g", "weight": 100, "dims": (8, 6, 3), "isF": False, "isL": False, "isT": False, "image": "🧼"},
        {"name": "Strong Teeth Toothpaste", "brands": ["Colgate", "Pepsodent", "Close Up", "Patanjali", "Sensodyne"], "sub": "Toothpaste", "price_range": (50, 90), "unit": "g", "weight": 100, "dims": (15, 4, 4), "isF": False, "isL": False, "isT": False, "image": "🪥"},
        {"name": "Moisturizing Cream", "brands": ["Nivea", "Pond's", "Himalaya", "Olay", "Lakme"], "sub": "Skincare", "price_range": (120, 250), "unit": "ml", "weight": 100, "dims": (7, 7, 7), "isF": False, "isL": False, "isT": False, "image": "🧴"},
        {"name": "Hair Oil", "brands": ["Parachute", "Bajaj", "Dabur", "Navratna"], "sub": "Haircare", "price_range": (80, 150), "unit": "ml", "weight": 200, "dims": (5, 5, 15), "isF": False, "isL": True, "isT": False, "image": "🧴"},
        {"name": "Body Deodorant", "brands": ["Fogg", "Engage", "Nivea", "Wild Stone", "Axe"], "sub": "Deodorant", "price_range": (150, 250), "unit": "ml", "weight": 150, "dims": (5, 5, 15), "isF": False, "isL": True, "isT": False, "image": "💨", "isH": True},
    ]},
    "Household": {"prefix": "HOU", "count": 40, "templates": [
        {"name": "Glass & Surface Cleaner", "brands": ["Colin", "Lizol", "Mr Muscle"], "sub": "Cleaning sprays", "price_range": (80, 110), "unit": "ml", "weight": 500, "dims": (10, 5, 20), "isF": False, "isL": True, "isT": False, "image": "🧽"},
        {"name": "Washing Machine Detergent", "brands": ["Surf Excel", "Ariel", "Tide", "Rin", "Wheel"], "sub": "Detergent", "price_range": (180, 250), "unit": "kg", "weight": 1000, "dims": (20, 15, 8), "isF": False, "isL": False, "isT": False, "image": "🧺"},
        {"name": "Dishwash Gel", "brands": ["Vim", "Pril", "Exo"], "sub": "Dishwash", "price_range": (100, 150), "unit": "ml", "weight": 500, "dims": (8, 5, 20), "isF": False, "isL": True, "isT": False, "image": "🍽️"},
        {"name": "Garbage Bags", "brands": ["Naturem", "Presto", "Shalimar"], "sub": "Garbage bags", "price_range": (60, 100), "unit": "pack", "weight": 200, "dims": (15, 10, 5), "isF": False, "isL": False, "isT": False, "image": "🗑️"},
        {"name": "Facial Tissues", "brands": ["Origami", "Paseo", "Kleenex"], "sub": "Tissues", "price_range": (50, 90), "unit": "pack", "weight": 150, "dims": (20, 10, 5), "isF": False, "isL": False, "isT": False, "image": "🧻"},
        {"name": "Kitchen Paper Towels", "brands": ["Origami", "Paseo", "Presto"], "sub": "Paper towels", "price_range": (70, 120), "unit": "pack", "weight": 200, "dims": (15, 15, 20), "isF": False, "isL": False, "isT": False, "image": "🧻"},
        {"name": "Room Freshener Spray", "brands": ["Odonil", "Ambi Pur", "Godrej aer"], "sub": "Fresheners", "price_range": (120, 160), "unit": "ml", "weight": 200, "dims": (5, 5, 20), "isF": False, "isL": True, "isT": False, "image": "💨", "isH": True},
    ]},
    "Baby Care": {"prefix": "BAB", "count": 25, "templates": [
        {"name": "Baby Diapers (L)", "brands": ["Pampers", "Huggies", "MamyPoko", "Supples"], "sub": "Diapers", "price_range": (350, 550), "unit": "pack", "weight": 800, "dims": (30, 20, 15), "isF": False, "isL": False, "isT": False, "image": "👶"},
        {"name": "Gentle Baby Wipes", "brands": ["Johnson's", "Himalaya", "Pampers", "LuvLap"], "sub": "Baby wipes", "price_range": (80, 150), "unit": "pack", "weight": 300, "dims": (15, 10, 5), "isF": False, "isL": False, "isT": False, "image": "🧻"},
        {"name": "Infant Cereal", "brands": ["Cerelac", "Slurrp Farm", "Nestle"], "sub": "Baby food", "price_range": (200, 300), "unit": "g", "weight": 300, "dims": (15, 10, 8), "isF": False, "isL": False, "isT": False, "image": "🥣"},
        {"name": "Baby Massage Oil", "brands": ["Johnson's", "Himalaya", "Dabur", "Mamaearth"], "sub": "Baby toiletries", "price_range": (150, 250), "unit": "ml", "weight": 200, "dims": (6, 6, 15), "isF": False, "isL": True, "isT": False, "image": "🧴"},
        {"name": "Baby Soap", "brands": ["Johnson's", "Himalaya", "Dove", "Sebamed"], "sub": "Baby toiletries", "price_range": (50, 100), "unit": "g", "weight": 75, "dims": (7, 5, 3), "isF": False, "isL": False, "isT": False, "image": "🧼"},
    ]},
    "Pet Care": {"prefix": "PET", "count": 15, "templates": [
        {"name": "Dry Dog Food", "brands": ["Pedigree", "Drools", "Royal Canin", "Meat Up"], "sub": "Dog food", "price_range": (250, 400), "unit": "kg", "weight": 1200, "dims": (25, 15, 10), "isF": False, "isL": False, "isT": False, "image": "🐕"},
        {"name": "Dry Cat Food", "brands": ["Whiskas", "Drools", "Me-O", "Purina"], "sub": "Cat food", "price_range": (150, 300), "unit": "kg", "weight": 1200, "dims": (25, 15, 10), "isF": False, "isL": False, "isT": False, "image": "🐈"},
        {"name": "Meat Jerky Treats", "brands": ["Pedigree", "Meat Up", "Drools"], "sub": "Pet treats", "price_range": (80, 150), "unit": "g", "weight": 100, "dims": (15, 10, 2), "isF": False, "isL": False, "isT": False, "image": "🥩"},
        {"name": "Pet Shampoo", "brands": ["Himalaya", "Captain Zack", "Wahl"], "sub": "Pet hygiene", "price_range": (150, 300), "unit": "ml", "weight": 200, "dims": (6, 6, 15), "isF": False, "isL": True, "isT": False, "image": "🧴"},
    ]},
    "Pharmacy/Wellness": {"prefix": "PHR", "count": 20, "templates": [
        {"name": "Multivitamin Tablets", "brands": ["Supradyn", "Zingavita", "HealthKart", "Revital"], "sub": "Vitamins", "price_range": (150, 300), "unit": "pack", "weight": 50, "dims": (10, 5, 5), "isF": False, "isL": False, "isT": False, "image": "💊"},
        {"name": "Pain Relief Spray", "brands": ["Volini", "Moov", "Iodex", "Omnigel"], "sub": "Pain relief", "price_range": (120, 180), "unit": "g", "weight": 50, "dims": (4, 4, 12), "isF": False, "isL": True, "isT": False, "image": "🩹", "isH": True},
        {"name": "Antiseptic Liquid", "brands": ["Dettol", "Savlon"], "sub": "First aid", "price_range": (60, 100), "unit": "ml", "weight": 100, "dims": (5, 5, 10), "isF": False, "isL": True, "isT": False, "image": "🏥"},
        {"name": "Chyawanprash", "brands": ["Dabur", "Baidyanath", "Patanjali", "Zandu"], "sub": "Immunity boosters", "price_range": (150, 250), "unit": "g", "weight": 500, "dims": (10, 10, 15), "isF": True, "isL": False, "isT": False, "image": "🍯"},
        {"name": "Digestive Tablets", "brands": ["Hajmola", "Pudin Hara", "Eno", "Digene"], "sub": "Digestive health", "price_range": (30, 80), "unit": "pack", "weight": 50, "dims": (10, 8, 2), "isF": False, "isL": False, "isT": False, "image": "💊"},
    ]},
    "Convenience": {"prefix": "CON", "count": 20, "templates": [
        {"name": "AA Batteries", "brands": ["Duracell", "Eveready", "Nippo", "Panasonic"], "sub": "Batteries", "price_range": (40, 150), "unit": "pack", "weight": 100, "dims": (10, 5, 2), "isF": False, "isL": False, "isT": False, "image": "🔋", "isH": True},
        {"name": "Notebook", "brands": ["Classmate", "Navneet", "Camlin"], "sub": "Stationery", "price_range": (40, 80), "unit": "pcs", "weight": 200, "dims": (25, 20, 1), "isF": False, "isL": False, "isT": False, "image": "📓"},
        {"name": "LED Bulb (9W)", "brands": ["Philips", "Syska", "Crompton", "Havells"], "sub": "Light bulbs", "price_range": (80, 120), "unit": "pcs", "weight": 100, "dims": (8, 8, 12), "isF": True, "isL": False, "isT": False, "image": "💡"},
        {"name": "Transparent Tape", "brands": ["Cello", "Kangaro", "3M"], "sub": "Tape", "price_range": (20, 50), "unit": "pcs", "weight": 50, "dims": (8, 8, 2), "isF": False, "isL": False, "isT": False, "image": "📼"},
        {"name": "Super Glue", "brands": ["Fevikwik", "Fevicol"], "sub": "Small tools", "price_range": (5, 20), "unit": "pack", "weight": 10, "dims": (8, 5, 1), "isF": False, "isL": True, "isT": False, "image": "🧪"},
        {"name": "Safety Matches", "brands": ["Homelites", "Ship"], "sub": "Matchbox", "price_range": (5, 20), "unit": "pack", "weight": 20, "dims": (8, 5, 2), "isF": False, "isL": False, "isT": False, "image": "🔥", "isH": True},
    ]}
}

def generate_products():
    products = []
    
    random.seed(42)  # For reproducibility
    
    for category, config in categories_config.items():
        prefix = config["prefix"]
        count = config["count"]
        templates = config["templates"]
        
        for i in range(count):
            template = random.choice(templates)
            
            # Create a variation
            brand = random.choice(template["brands"])
            name = f"{brand} {template['name']}"
            
            # Price
            base_price = random.randint(template["price_range"][0], template["price_range"][1])
            is_staple = category == "Grocery" and template["sub"] in ["Rice", "Flour/Atta", "Pulses/Dal", "Sugar/Salt/Jaggery", "Oils"]
            
            if is_staple:
                discount = 0
            else:
                discount = random.randint(5, 30)
                
            mrp = round(base_price / (1 - discount/100.0)) if discount > 0 else base_price
            price = base_price
            
            # Dimensions & Volume
            l, w, h = template["dims"]
            volume = l * w * h
            
            isH = template.get("isH", False)
            weight = template["weight"]
            
            # Drone eligible
            drone_eligible = True
            if weight > 5000:
                drone_eligible = False
            if isH:
                drone_eligible = False
            if l > 40 or w > 40 or h > 40:
                drone_eligible = False
                
            # Stock
            stock_roll = random.random()
            if stock_roll < 0.05:
                stock = 0
            else:
                stock = random.randint(1, 200)
                
            lowStockThreshold = random.randint(5, 15)
            
            # Modify stock again to hit ~10% below threshold if not 0
            if stock > 0 and random.random() < 0.1:
                stock = random.randint(1, lowStockThreshold - 1)
                
            rating = round(random.uniform(3.0, 5.0), 1)
            reviewCount = random.randint(0, 5000)
            
            sustainabilityScore = random.randint(1, 5)
            
            product_id = f"{prefix}-{str(i+1).zfill(3)}"
            
            keywords = [brand.lower(), template["name"].lower(), category.lower(), template["sub"].lower()]
            
            product = {
                "id": product_id,
                "name": name,
                "brand": brand,
                "category": category,
                "subcategory": template["sub"],
                "price": price,
                "mrp": mrp,
                "discount": discount,
                "weight": weight,
                "unit": template["unit"],
                "packageLength": l,
                "packageWidth": w,
                "packageHeight": h,
                "volume": volume,
                "stock": stock,
                "lowStockThreshold": lowStockThreshold,
                "rating": rating,
                "reviewCount": reviewCount,
                "image": template["image"],
                "description": f"High quality {template['name'].lower()} from {brand}. Perfect for your daily needs.",
                "keywords": list(set(keywords)),
                "isFragile": template["isF"],
                "isLiquid": template["isL"],
                "isTemperatureSensitive": template["isT"],
                "isHazardous": isH,
                "droneEligible": drone_eligible,
                "sustainabilityScore": sustainabilityScore
            }
            products.append(product)
            
    return products

if __name__ == "__main__":
    out_dir = r"c:\Users\ajain\Downloads\SMA_P\quick-commerce\src\data"
    os.makedirs(out_dir, exist_ok=True)
    
    out_file = os.path.join(out_dir, "products.json")
    
    products = generate_products()
    
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
        
    print(f"Generated {len(products)} products and saved to {out_file}")
