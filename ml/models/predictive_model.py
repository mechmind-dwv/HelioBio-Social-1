# ml/models/predictive_model.py
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import numpy as np

class HelioBioPredictor:
    def __init__(self, sequence_length=30, prediction_horizon=7):
        self.sequence_length = sequence_length
        self.prediction_horizon = prediction_horizon
        self.model = self._build_model()
        
    def _build_model(self):
        """Construye modelo LSTM para predicción heliobiosocial"""
        model = Sequential([
            LSTM(128, return_sequences=True, input_shape=(self.sequence_length, 5)),
            Dropout(0.2),
            LSTM(64, return_sequences=True),
            Dropout(0.2),
            LSTM(32),
            Dropout(0.2),
            Dense(32, activation='relu'),
            Dense(self.prediction_horizon, activation='linear')
        ])
        
        model.compile(
            optimizer='adam',
            loss='mse',
            metrics=['mae', 'mape']
        )
        
        return model
    
    def prepare_data(self, solar_data, mental_data):
        """Prepara datos para entrenamiento"""
        # Combinar características solares y de salud mental
        features = np.column_stack([
            solar_data['kp_index'],
            solar_data['sunspot_number'],
            solar_data['solar_wind_speed'],
            mental_data['psychiatric_admissions'],
            mental_data['depression_index']
        ])
        
        # Crear secuencias para LSTM
        X, y = [], []
        for i in range(len(features) - self.sequence_length - self.prediction_horizon):
            X.append(features[i:(i + self.sequence_length)])
            y.append(mental_data['psychiatric_admissions'][
                (i + self.sequence_length):(i + self.sequence_length + self.prediction_horizon)
            ])
        
        return np.array(X), np.array(y)
    
    def train(self, X, y, epochs=100, validation_split=0.2):
        """Entrena el modelo predictivo"""
        history = self.model.fit(
            X, y,
            epochs=epochs,
            validation_split=validation_split,
            batch_size=32,
            verbose=1
        )
        
        return history
    
    def predict(self, recent_data):
        """Realiza predicción de salud mental basada en actividad solar"""
        prediction = self.model.predict(recent_data.reshape(1, self.sequence_length, 5))
        return prediction[0]
