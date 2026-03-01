from flask import Flask, jsonify, request, send_from_directory
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

DB_FILE = "./backend/database.db"
IMAGE_DIR = "./innova-images"


def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        username = request.args.get("username")
        password = request.args.get("password")

    if not username or not password:
        return jsonify({"error": "Missing credentials"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")

    conn = get_db_connection()
    try:
        conn.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            (username, hashed_pw),
        )
        conn.commit()
        return jsonify({"message": "User created successfully"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "User already exists"}), 409
    finally:
        conn.close()


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    conn = get_db_connection()
    user = conn.execute(
        "SELECT * FROM users WHERE username = ?", (username,)
    ).fetchone()
    conn.close()

    if user and bcrypt.check_password_hash(user["password"], password):
        # In a real app, you'd return a JWT token here
        return jsonify({"message": "Login successful", "user": username}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401


@app.route("/product-list", methods=["GET"])
def product_list():
    conn = get_db_connection()
    products = conn.execute("SELECT * FROM products").fetchall()
    conn.close()
    return jsonify([dict(row) for row in products])


@app.route("/product-images/<filename>", methods=["GET"])
def get_image(filename):
    return send_from_directory(IMAGE_DIR, filename)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
