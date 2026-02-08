import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib
import os

os.makedirs('models', exist_ok=True)

# Datos de entrenamiento (Humedad Suelo, Temp, Prob. Lluvia)
data = {
    'hum_suelo': [10, 20, 80, 40, 15, 90, 30],
    'temp': [35, 30, 18, 25, 32, 20, 28],
    'prob_lluvia': [0, 5, 90, 10, 0, 80, 5],
    'riego': [1, 1, 0, 0, 1, 0, 1] # Target: 1=Regar, 0=No
}

df = pd.DataFrame(data)
X = df.drop('riego', axis=1)
y = df['riego']

model = DecisionTreeClassifier()
model.fit(X, y)
joblib.dump(model, 'models/decision_tree_v1.pkl')
print("Modelo generado con éxito.")