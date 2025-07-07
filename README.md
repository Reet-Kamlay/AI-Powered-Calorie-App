# 🧠 AI-Powered Calorie App 🍱

This is a full-stack **AI-powered calorie estimation web app** that uses **machine learning** and **image recognition** to identify food items from uploaded images and estimate their nutritional value. Built using **React**, **Flask**, and a trained deep learning model, this app provides a modern interface for tracking calories easily with automation.

---

## 🌐 Live Demo

🔗 [AI Calorie App – Try It Live](https://ai-powered-calorie-app.vercel.app)

---

## 🧰 Tech Stack

- **Frontend:** React JS, CSS, Axios
- **Backend:** Python, Flask
- **Machine Learning:** TensorFlow / PyTorch (via custom-trained model)
- **Image Processing:** OpenCV, PIL
- **Deployment:** Vercel (frontend), Render (backend)

---

## 🧠 Key Features

- 📷 Upload food images directly from the UI
- 🧠 AI detects food items in the image
- 🔬 Estimates **calories**, **fat**, **carbs**, and **protein**
- 🔁 Multiple dishes detected in a single image
- 💾 Nutrition data fetched using Open Food Facts API
- 📈 Breakdown per ingredient or per dish
- ⚡ Fast and intuitive React UI

---

## 📁 Folder Structure

```
AI-Powered-Calorie-App/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # UI components (Upload, Results, Loader)
│   │   ├── pages/             # Upload page, Result page
│   │   └── App.js             # Routing and layout
│   └── public/
│   └── package.json
│
├── server/                    # Flask backend
│   ├── model/                 # Trained ML model and helper scripts
│   ├── utils/                 # Image processing and API integration
│   ├── app.py                 # Main Flask app with API routes
│   ├── requirements.txt
│   └── .env                   # API keys and model paths
└── README.md
```

---

## 🚀 Getting Started

### 🧭 Prerequisites

- Node.js and npm
- Python 3.x and pip
- Virtual environment (optional)
- Vercel and/or Render account (for deployment)

---

### 1. Clone the Repo

```bash
git clone https://github.com/Reet-Kamlay/AI-Powered-Calorie-App.git
cd AI-Powered-Calorie-App
```

---

### 2. Run the Flask Backend

```bash
cd server
pip install -r requirements.txt
python app.py
```

> The backend will start on `http://localhost:5000`

---

### 3. Run the React Frontend

```bash
cd client
npm install
npm start
```

> The frontend will start on `http://localhost:3000` and make API calls to the Flask backend

---

## 📦 ML Model Details

- Model trained to detect **20+ common food items**
- Uses **YOLO / MobileNet** or custom CNN
- Predictions mapped to nutritional values using [Open Food Facts API](https://world.openfoodfacts.org/)

---

## 📸 How It Works

1. 📤 User uploads a photo of a meal
2. 🧠 AI model detects and labels food items
3. 🔢 Calorie estimates are generated using ingredient-level nutrition data
4. ✅ Final results are shown with total and per-item breakdown

---

## 👨‍💻 Author

**Reet Kamlay**  
🔗 GitHub: [@Reet-Kamlay](https://github.com/Reet-Kamlay)

---

> Built to simplify food logging using the power of machine learning and real-time image recognition. Ideal for fitness apps, meal planners, and healthcare tools.
