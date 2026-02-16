
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="YOUR pass",
    database="task_manager"
)

cursor = db.cursor(dictionary=True)


@app.route("/")
def home():
    return jsonify({"message": "Backend is running"})


@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()

    title = data.get("title")
    description = data.get("description")

    if not title or not description:
        return jsonify({"error": "Invalid data"}), 400

    query = "INSERT INTO tasks (title, description) VALUES (%s, %s)"
    cursor.execute(query, (title, description))
    db.commit()

    task_id = cursor.lastrowid

    return jsonify({
        "id": task_id,
        "title": title,
        "description": description
    }), 201


@app.route("/tasks", methods=["GET"])
def get_tasks():
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    return jsonify(tasks), 200


@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    query = "DELETE FROM tasks WHERE id = %s"
    cursor.execute(query, (task_id,))
    db.commit()

    if cursor.rowcount == 0:
        return jsonify({"error": "Task not found"}), 404

    return jsonify({"message": "Task deleted"}), 200


if __name__ == "__main__":
    app.run(debug=True)
