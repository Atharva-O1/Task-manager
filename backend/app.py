from flask import Flask, jsonify, request

app = Flask(__name__)

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

    return jsonify({
        "title": title,
        "description": description
    }), 201


if __name__ == "__main__":
    app.run(debug=True)
