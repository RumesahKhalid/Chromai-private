from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io
import json
import os

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: production me specific domain add karo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = load_model("model.h5")

# Load class indices mapping
if os.path.exists("class_indices.json"):
    with open("class_indices.json", "r") as f:
        class_indices = json.load(f)
    # Reverse mapping: index → class name
    index_to_class = {v: k for k, v in class_indices.items()}
else:
    index_to_class = {0: "Down", 1: "Healthy"}  # fallback default

# Preprocessing function
def preprocess(image: Image.Image):
    image = image.convert("RGB")
    image = image.resize((64, 64))
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # shape (1,64,64,3)
    return img_array

@app.get("/")
async def root():
    return {"message": "ChromAI FastAPI Backend is running!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        processed = preprocess(image)

        prediction = model.predict(processed)
        prob = float(prediction[0][0])  # sigmoid output (between 0 and 1)

        # Apply correct mapping
        if prob >= 0.5:
            label = index_to_class[1]  # Healthy
            confidence = prob
        else:
            label = index_to_class[0]  # Down Syndrome
            confidence = 1 - prob

        return {
            "prediction": label,
            "confidence": round(confidence * 100, 2),  # percentage
            "notes": "This is an AI-based screening tool, not a medical diagnosis. Please consult a clinician."
        }

    except Exception as e:
        return {"error": str(e)}
