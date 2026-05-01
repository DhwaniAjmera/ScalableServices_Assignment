from flask import Flask, jsonify, request
from flasgger import Swagger
import uuid
import time

app = Flask(__name__)
swagger = Swagger(app)

@app.route("/health")
def health():
    return {"status": "UP"}

@app.route("/v1/sample", methods=["GET"])
def sample():
    return {"message": "Service is running"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)