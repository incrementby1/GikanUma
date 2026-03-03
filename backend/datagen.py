import json
import random
import sqlite3
import os

NUM_RECORDS = 50 
INPUT_FILE = "./datagen.json"
DB_FILE = "./database.db"

def init_database():
    # Ensure the directory exists
    os.makedirs(os.path.dirname(DB_FILE), exist_ok=True)
    
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("DROP TABLE IF EXISTS users")
    cursor.execute("DROP TABLE IF EXISTS products")
    cursor.execute('''CREATE TABLE users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                        username TEXT UNIQUE, 
                        password TEXT)''')
    
    cursor.execute('''CREATE TABLE products (
                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                        farmer TEXT, 
                        location TEXT, 
                        product TEXT, 
                        rating REAL, 
                        number_of_ratings INTEGER, 
                        image TEXT, 
                        farmgate_price REAL, 
                        market_price REAL)''')
    conn.commit()
    return conn

def seed_data():
    try:
        with open(INPUT_FILE, 'r') as f:
            config = json.load(f)
    except FileNotFoundError:
        print(f"Error: {INPUT_FILE} not found.")
        return

    conn = init_database()
    cursor = conn.cursor()

    crops = config["crop_products"]
    price_ref = config["prices"]

    for _ in range(NUM_RECORDS):
        product = random.choice(crops)
        base_fg = price_ref[product]["farmgate"]
        base_mk = price_ref[product]["market"]

        farmer = f"{random.choice(config['first_names'])} {random.choice(config['last_names'])}"
        location = random.choice(config["farm_locations"])
        rating = round(random.triangular(3.0, 5.0, 4.0), 1)
        num_ratings = random.randint(400, 700)
        fg_price = round(base_fg * random.uniform(0.9, 1.1), 2)
        mk_price = round(base_mk * random.uniform(0.9, 1.1), 2)

        cursor.execute('''INSERT INTO products 
            (farmer, location, product, rating, number_of_ratings, image, farmgate_price, market_price)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)''', 
            (farmer, location, product, rating, num_ratings, f"{product}.jpg", fg_price, mk_price))
    conn.commit()
    conn.close()
    print(f"SGEN {NUM_RECORDS} records into {DB_FILE} (Tables reset)")

if __name__ == "__main__":
    seed_data()