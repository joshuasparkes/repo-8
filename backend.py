# Flask App
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/duffel-flights-list-offers', methods=['POST'])
def duffel_flights_list_offers():
    url = 'https://api.duffel.com/air/offer_requests'
    headers = {
        "Accept-Encoding": "gzip",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Duffel-Version": "v2",
        "Authorization": f"Bearer {DUFFEL_API_KEY}"
    }
    data = request.get_json()
    response = requests.post(url, headers=headers, json=data)
    return jsonify(response.json()), response.status_code

if __name__ == '__main__':
    app.run(port=5000)
