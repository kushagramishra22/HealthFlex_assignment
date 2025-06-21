# ⏱️ Multi Timer App

A React Native app that allows users to create, manage, and interact with multiple customizable timers. Built with a clean and responsive UI using React Native + Expo.

---

## 🚀 Features

- ✅ Add Timers with custom name, category, and duration (in HH:MM:SS)
- ✅ View timers grouped by category (expand/collapse view)
- ✅ Start, Pause, Reset, and Delete individual timers
- ✅ Bulk Start / Pause / Reset for timers within a category
- ✅ Progress bar with percentage indicator
- ✅ Timer completion modal + History tracking
- ✅ Filter timers by category using dropdown
- ✅ Local data persistence using AsyncStorage

---

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/9c4a6b1e-7b3a-4e49-a15e-9ea37c07c15b)
---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kushagramishra22/HealthFlex_assignment.git
cd MultiTimerApp
```

### 2. Install Dependencies

If you're using Expo:

```bash
npm install -g expo-cli
expo install @react-navigation/native @react-navigation/material-top-tabs react-native-tab-view react-native-pager-view react-native-safe-area-context react-native-screens react-native-gesture-handler
npm install @react-native-async-storage/async-storage react-native-uuid react-native-progress @react-native-picker/picker
expo install @expo/vector-icons

```

### 3. Run the App

```bash
expo start
or npm start it will be given over there
```
Then scan the QR code using the Expo Go app on your mobile device and when you scan this qr plese let me know asi have to run th app.
if you are recruiter then you have my number call me.

![image](https://github.com/user-attachments/assets/6b7cfb30-189d-498f-9105-92bc0933c4f8)
---

## 🧠 Assumptions Made

- Duration is stored in seconds internally but entered as HH:MM:SS for better UX.
- Local state is persisted using AsyncStorage; no backend/database is used.
- Unique IDs are generated using `Date.now()`.
- App is built for mobile experience via Expo (Android/iOS) you can download from playstore.
---

## 📁 Project Structure

```
MultiTimerApp/
├── App.js
├── context/
│   └── TimerContext.js
├── components/
│   ├── AddTimerForm.js
│   └── TimerCard.js
├── screens/
│   ├── HomeScreen.js
│   └── HistoryScreen.js
```

---

## 📦 Dependencies

- react-native
- expo
- @react-navigation/native
- @react-navigation/material-top-tabs
- @react-native-async-storage/async-storage
- react-native-progress
- react-native-picker/picker (for filtering dropdown)

---

## ✨ Future Improvements

- 🔔 Halfway and custom alerts
- 💾 Export history to JSON
- 🌗 Dark mode / theme switcher
- 🧹 Swipe-to-delete or re-order timers

---

## 📄 License

MIT License © 2025 Kushagra Mishra.
