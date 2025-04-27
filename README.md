# Pegasus App

Pegasus is a mobile rehabilitation application designed to work alongside an Arduino-based pegboard device. It helps stroke patients improve motor skills by completing predefined patterns on a 6-peg board, while tracking their progress over time.

## Frontend (Mobile App)

Built with **React Native** and **Expo**.

### Features:
- User Registration and Login
- Pattern Selection (Levels 1-4)
- Pattern Preview Animation
- Start Button to initiate training session
- Progress Tracking (coming soon)

### Tech Stack:
- React Native
- Expo
- React Native Reanimated
- react-native-element-dropdown

### How to Run (Frontend)

```bash
cd frontend/pegasusApp
npm install
npx expo start
```

- Then scan the QR code using the **Expo Go** app on your phone.

## Backend (API Server)

Built with Node.js, Express, and MongoDB.

### Features:
- User Registration
- User Login
- Update User Profile (Phone Number)
- Arduino Communication (Send and Receive Data)
- Save Progress Data (Level, Pattern, Time Taken)

### Tech Stack:
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Axios (for internal requests)
- serialport (for Arduino USB communication)

### How to Run (Backend)

```bash
cd backend/node
npm install
```

- Ensure MongoDB is running locally or update your database URI in the `connectDB` file.

```bash
node app.js
```

### Notes:
- The server listens on port 3000 by default.
- If an Arduino device is not connected, the server will run into issues and not run. 

## 📡 Communication Flow

- **App to Backend:**
  - User selects a pattern level and clicks Start.
  - The app sends a POST request with the selected level to the backend.
  - There are also routes for registration, login, delete user, etc but these are currently not implemented. 

- **Backend to Arduino:**
  - The backend sends the pattern corresponding to the level via serial communication.

- **Arduino to Backend:**
  - Arduino executes the pattern and sends back the time taken upon completion.

- **Backend to Database:**
  - Backend saves the user's progress (level, pattern, and time taken) into MongoDB.


## 🚀 Future Improvements

- Add real-time graphs and analytics for patient progress.
- Gamify daily streaks and achievements to boost patient engagement.
- Add password encryption (bcrypt) and secure authentication (JWT).
- Improve mobile UI/UX for accessibility and ease of use.

## 🛠️ Developers

- Frontend: React Native, Expo
- Backend: Node.js, Express.js, MongoDB
- Hardware: Arduino + Custom 6-Pin Pegboard

## 💡 Important Notes

- If you connect Arduino to a different USB port, update the port in `app.js`:

  ```javascript
  const ARDUINO_PORT = '/dev/tty.usbserial-110'; 
  ```

- This app is intended as a research and rehabilitation tool for patients with motor skill impairments.
