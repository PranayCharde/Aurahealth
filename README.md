# AuraHealth — Telemetry & User Command Admin Panel

A modern, high-performance **React.js** web administration panel designed for the **AuraHealth Mobile Tracker & Wellness Ecosystem**.

---

## 🚀 Key Features

* **Complete Athlete & User Command Center**: Inspect all registered users, roles, account statuses, registration dates, and physiological baselines (Age, Gender, Height, Weight, Body Fat %).
* **Bodybuilder Nutrition & Macro Telemetry Inspector**: Real-time view of daily caloric targets, actual consumption, protein intake ratios (e.g. `3.0g / kg BW`), carbohydrate/fat partitioning, micronutrients (**Fiber & Sodium for vascularity/pump**), meal timelines, and daily supplement stacks.
* **Vitals & Clinical ECG Registry**: Monitor real-time biometrics: resting heart rate, Heart Rate Variability (HRV ms), blood pressure (Systolic/Diastolic/MAP), fasting blood glucose, SpO2, and historical single-lead ECG recordings.
* **Sleep Architecture & Hypnograms**: View nocturnal sleep durations, sleep quality scores (0–100), and breakdown of Deep sleep, REM, Light sleep, and awake debt.
* **Activity & Strain Analytics**: Daily cardiovascular strain metrics (0–21), exercise sessions, average/peak heart rates, and calories burned.
* **Interactive Data Tables & Sorting**: Search athletes across name, email, or health goals; filter by role or active status; sort by readiness, protein, or strain.
* **Data Export**: 1-click export of the entire user telemetry dataset as structured JSON.
* **Dual Theme Engine**: Seamless toggle between **Midnight Bio-Luminescence** (Dark) and **Clinical Day Porcelain** (Light) modes.
* **Backend & MongoDB Live Telemetry**: Live connection probe with the Node.js/Express backend running on `http://localhost:5000`, with interactive test endpoints for `/api/health`, `/api/nutrition/analyze-meal`, and `/api/auth/demo`.

---

## 🛠️ Quick Start

### 1. Install Dependencies
Open your terminal in `C:\Users\prana\Desktop\New folder\app admin panel`:
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

The admin panel will launch at:
`http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

---

## 🔌 Connection to AuraHealth Backend

The admin panel is configured to communicate with the AuraHealth Express API:
* **Backend API Base**: `http://localhost:5000/api`
* **Health Check**: `http://localhost:5000/api/health`

If the backend server is running in `my app backend`, the admin panel will automatically detect it and show **MONGODB CONNECTED** in green. If the backend is offline, the admin panel automatically runs using the comprehensive mock dataset so all charts and views remain fully operational.

