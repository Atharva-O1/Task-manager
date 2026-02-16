from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
tasks = []
CORS(app)

@app.route("/")
def home():
    return jsonify({
        "message": "Backend is running"
    })

@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()

    title = data.get("title")
    description = data.get("description")

    if not title or not description:
        return jsonify({"error": "Invalid data"}), 400
    
    task = {
        "id": len(tasks) + 1,
        "title": title,
        "description": description
    }

    tasks.append(task)

    return jsonify(task), 201

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks), 200


if __name__ == "__main__":
    app.run(debug=True)
