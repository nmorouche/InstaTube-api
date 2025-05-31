# 📡 InstaTube-api

**InstaTube-api** is the backend service powering the InstaTube mobile application.
It is built with **Node.js** using the **Express** framework, and provides a set of RESTful endpoints to support features like user stories, video shorts, and user interactions (likes, story seen).

---

## 🛠️ Prerequisites

Before running the project, ensure the following are installed:

- Node.js (v14 or later)  
- MongoDB

---

## 🧱 Database Setup

1. **Start MongoDB** on your local machine.

2. **Create the database and collections**:  
   - Database name: `InstaTube`  
   - Collections:  
     - `short`  
     - `user`

3. **Import the dataset**:  
   - Import `short.json` into the `short` collection:  
     mongoimport --db InstaTube --collection short --file dataset/short.json --jsonArray

   - Import `user.json` into the `user` collection:  
     mongoimport --db InstaTube --collection user --file dataset/user.json --jsonArray

---

## 🚀 Installation & Run

Clone the repository and start the server:
```
git clone https://github.com/yourusername/InstaTube-api.git  
cd InstaTube-api  
npm install  
npm start
```
The server will run at:
```
http://localhost:3000
```
---

## 🌐 API Endpoints

### ✅ Base Endpoint
```
curl -X GET http://localhost:3000
```
Returns a basic confirmation message that the API is running.

---

### 📖 Get All Stories and Shorts
```
curl -X GET http://localhost:3000/story/all
```
Returns:  
- All users and their associated stories  
- All available short videos

---

### ❤️ Like a Story
```
curl -X GET http://localhost:3000/story/{userId}/{storyId}
```
Registers a like on a specific story by user.  
Replace `{userId}` and `{storyId}` with the actual values.

---

### ❤️ Like a Short
```
curl -X GET http://localhost:3000/short/{shortId}
```
Registers a like on a specific short video.  
Replace `{shortId}` with the actual value.

---

## 📁 Project Structure
```
InstaTube-api/  
├── routes/         # API route definitions  
├── controllers/    # Endpoint logic  
├── models/         # Mongoose schemas  
├── dataset/        # JSON files for initial data import  
├── app.js          # Express app entry point  
├── package.json
```
---

## 🧪 Future Enhancements

- Add POST endpoints for story/short creation  
- User authentication and token-based security  
- Like analytics and view tracking  
- Input validation and comprehensive error handling

---

## 👨‍💻 Author

Developed with ❤️ by **Nassim Morouche**

---
