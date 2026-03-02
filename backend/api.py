from flask import Flask, Response, jsonify, request, send_from_directory
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from typing import List, Any, Tuple
import sqlite3

DB_FILE = "./backend/database.db"
IMAGE_DIR = "./innova-images"

class Application:
    _app: Flask
    _bcrypt: Bcrypt

    def __init__(self) -> None:
        self._app = Flask(__name__)
        self._bcrypt = Bcrypt(self._app)
        CORS(self._app)
        self._app.add_url_rule("/register", view_func=self.register, methods=["POST"])
        self._app.add_url_rule("/login", view_func=self.login, methods=["POST"])
        self._app.add_url_rule("/product-list", view_func=self.product_list, methods=["GET"])
        self._app.add_url_rule("/product-images/<filename>", view_func=self.get_image, methods=["GET"])


    @property
    def db(self) -> sqlite3.Connection: # Create a connection 
        dbcon: sqlite3.Connection = sqlite3.Connection(DB_FILE)
        dbcon.row_factory = sqlite3.Row
        return dbcon
    
    def register(self) -> Tuple[Response, int]:
        data = request.json
        username: Any = data.get("username") or request.args.get("username")
        password: Any = data.get("password") or request.args.get("password")

        if not username or not password:
            return jsonify({"error": "Missing credentials"}), 400
        hashed_pw: str = self._bcrypt.generate_password_hash(password).decode("utf-8")
        db: sqlite3.Connection = self.db
        try:
            insert_command: str = "INSERT INTO users (username, password) VALUES (?, ?)"
            db.execute(insert_command, (username, hashed_pw))
            db.commit()
            return jsonify({"message": "User created successfully"}), 201
        except sqlite3.IntegrityError:
            return jsonify({"error": "User already exists"}), 409
        finally:
            db.close()

    def login(self) -> Tuple[Response, int]:
        data = request.json
        username: Any = data.get("username")
        password: Any = data.get("password")
        select_user_command: str = "SELECT * FROM users WHERE username = ?"
        db: sqlite3.Connection = self.db
        user: Any = db.execute(select_user_command, (username,)).fetchone()
        db.close()
        if user and self._bcrypt and self._bcrypt.check_password_hash(user["password"], password):
            return jsonify({"message": "Login successful", "user": username}), 200
        else:
            return jsonify({"error": "Invalid username or password"}), 401

    def product_list(self) -> Response:
        db: sqlite3.Connection = self.db
        products: List[Any] = db.execute("SELECT * FROM products").fetchall()
        db.close()
        return jsonify([dict(row) for row in products])

    def get_image(self, filename) -> Response:
        return send_from_directory(IMAGE_DIR, filename)

if __name__ == "__main__":
    app: Application = Application()
    app._app.run('0.0.0.0', debug=True)
    
