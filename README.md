# 📚 EduShare – Student Notes Sharing & Discussion Platform

EduShare is a **cloud-native, scalable student collaboration platform** built using a serverless architecture powered by Firebase. It enables students to share notes, solve doubts, and collaborate in real time without managing traditional backend servers. The platform uses cloud services like Authentication, Firestore Database, and Storage for seamless data handling and real-time interaction. Deployed on GitHub Pages with global CDN support, EduShare ensures high availability, fast performance, and secure access. Its architecture supports scalability, low latency, and cost-efficient deployment, making it an ideal modern EdTech solution.

---

## 🚀 Features

### 📖 Notes Sharing
- Upload notes via Google Drive links or files  
- Add subject, tags, semester, and description  
- Preview notes before opening  
- Like, bookmark, and download options  

### ❓ Doubt Discussion System
- Ask and answer questions (StackOverflow-style)  
- Upvote/downvote answers  
- Mark accepted answers  
- Threaded discussions  

### 👤 Contributor Profiles
- Public user profiles  
- Contribution stats (notes, answers, likes)  
- Badges (Top Contributor, Most Helpful, etc.)  

### ⭐ Rating & Reviews
- 5-star rating system  
- User reviews and feedback  
- Highlight top-rated notes  

### 🔍 Smart Search & Filters
- Search by subject, topic, or keyword  
- Filter by semester, popularity, latest  
- Tag-based discovery  

### 👥 Study Groups
- Create/join subject-based groups  
- Real-time chat  
- Collaborative discussions  

### 📄 Previous Year Papers & Mock Tests
- Access PYQs  
- MCQ quizzes with timer  
- Instant results and score tracking  

### 🔥 Trending Section
- Discover popular notes and discussions  
- Based on views, likes, downloads  

### 📰 Education News Feed
- Real-time academic news updates  
- Categories: exams, internships, scholarships, global news  

---

## 🛠️ Tech Stack

**Frontend**
- React.js  
- Tailwind CSS  
- Framer Motion  

**Backend (Cloud-Based)**
- Firebase Authentication  
- Firestore Database  
- Firebase Storage  

**Hosting**
- Firebase Hosting  

**APIs**
- News API / Google News RSS  

---

## 🏗️ System Architecture

```
User → React Frontend
        ↓
 Firebase Hosting (CDN)
        ↓
 Firebase Services
 (Auth + Firestore + Storage)
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/student-notes-sharing-and-discussion-platform.git
cd student-notes-sharing-and-discussion-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Firebase
- Create a Firebase project  
- Enable Authentication  
- Setup Firestore Database  
- Enable Storage  
- Add Firebase config in `.env`

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Project
```bash
npm start
```

---

## 🌐 Deployment (Firebase Hosting)

### Build the project
```bash
npm run build
```

### Deploy using Firebase CLI
```bash
firebase deploy
```

---

## 🎯 Future Enhancements

- AI-based note summarization  
- Personalized recommendations  
- Multilingual support  
- Advanced analytics dashboard  
- Mobile app version  

---

## 🤝 Contributing

1. Fork the repository  
2. Create a new branch  
3. Make changes  
4. Commit and push  
5. Open a Pull Request  

---

## 📄 License

This project is licensed under the MIT License.

---


## ⭐ Support

If you like this project, give it a ⭐ and share it!
=======
# EduShare - Collaborative Learning & QnA Platform

EduShare is a modern platform designed for students to share notes, participate in discussions, and collaborate effectively.

## Features
- **Notes Library**: Browse and share study materials across various subjects and semesters.
- **QnA Center**: Get your doubts cleared by the community.
- **Study Groups**: Form groups and study together.
- **Dashboard**: Track your progress and contributions.

## Tech Stack
- React + Vite
- TypeScript
- Tailwind CSS
- Firebase (Authentication, Firestore, Storage)
- Lucide React (Icons)
- Framer Motion (Animations)

## Deployment
Hosted on GitHub Pages at: [https://Vivek492005.github.io/EduShare---collaborative-learning-notes-and-qna-platform/](https://Vivek492005.github.io/EduShare---collaborative-learning-notes-and-qna-platform/)

