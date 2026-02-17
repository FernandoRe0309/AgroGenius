# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
import random
import time

app = Flask(__name__)
CORS(app) # Permite que React (Puerto 5173) hable con Python (Puerto 5000)

# --- SIMULACIÓN DE MACHINE LEARNING (Paso previo a tu modelo real) ---
def decision_tree_logic(humedad_suelo, temperatura):
    # Lógica básica de tu tesis: Si el suelo está seco (<30%) y hace calor (>25°C), REGAR.
    if humedad_suelo < 30 and temperatura > 25:
        return "RIEGO ACTIVO", "critical"
    elif humedad_suelo < 30:
        return "RIEGO PREVENTIVO", "warning"
    else:
        return "ESPERAR", "success"

@app.route('/api/sensors', methods=['GET'])
def get_sensors():
    # AQUÍ LEEREMOS EL ARDUINO REAL DESPUÉS
    # Por ahora, generamos datos realistas para probar el Dashboard
    temp = round(random.uniform(22.0, 28.0), 1)
    hum_suelo = round(random.uniform(20.0, 60.0), 1)
    hum_aire = round(random.uniform(40.0, 70.0), 1)
    co2 = random.randint(400, 450)

    ml_status, alert_level = decision_tree_logic(hum_suelo, temp)

    return jsonify({
        "temperatura": temp,
        "humedad_suelo": hum_suelo,
        "humedad_aire": hum_aire,
        "co2": co2,
        "ml_decision": ml_status,
        "alert_level": alert_level, # Para cambiar colores en el frontend
        "timestamp": time.strftime("%H:%M:%S")
    })

if __name__ == '__main__':
    print("🔥 Servidor AgroGenius corriendo en puerto 5000...")
    app.run(debug=True, port=5000)