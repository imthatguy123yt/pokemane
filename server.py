from flask import Flask, jsonify
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

creatures = [
    {"name": "Flameling", "hp": 30},
    {"name": "Aquava", "hp": 35},
    {"name": "Terranox", "hp": 40}
]

current_enemy = {}

@app.route("/enemy")
def enemy():
    global current_enemy
    current_enemy = random.choice(creatures).copy()
    return jsonify(current_enemy)

@app.route("/attack")
def attack():
    global current_enemy
    damage = random.randint(5, 15)
    current_enemy["hp"] -= damage
    
    if current_enemy["hp"] <= 0:
        return jsonify({"result": "Enemy defeated!"})
    else:
        return jsonify({"result": f"You dealt {damage} damage!"})

if __name__ == "__main__":
    app.run(debug=True)
