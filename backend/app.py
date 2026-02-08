from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Cargar el modelo .pkl que generamos previamente [cite: 715]
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, 'models', 'decision_tree_v1.pkl')
model = joblib.load(model_path)

@app.route('/api/predict', methods=['POST'])
def predict():
    # Recibe datos de sensores + API de Google Weather
    data = request.json 
    # Estructura para Sklearn: [temp_int, hum_suelo, prob_lluvia, hora] [cite: 725]
    df = pd.DataFrame([data])
    prediction = int(model.predict(df)[0])
    
    return jsonify({
        "riego": prediction, # 1=Sí, 0=No [cite: 720]
        "mensaje": "Iniciando Riego" if prediction == 1 else "Humedad Óptima"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)