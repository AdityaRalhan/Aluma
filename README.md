# Aluma – Personalized Mental & Emotional Healthcare Platform

Aluma is a full-stack, AI-powered wellness platform that helps users care for their mental and emotional health. It promotes well-being through intelligent chatbots, mood tracking, soothing music integrations, and personalized dashboards.

---

## 🌟 Purpose

Aluma aims to make emotional healthcare accessible by offering a safe, interactive, and personalized space for mental wellness. With AI-driven support and motivational tools, it helps users build healthier emotional habits.

---

## 🚀 Key Features

- **Personalized Dashboards** – Dynamic dashboards that adjust content based on user mood patterns and activity.
- **AI Chatbots**
  - **Elena** – Empathetic emotional support.
  - **Jess** – Motivational chatbot offering positive reinforcement.
- **Mood Journal** – Secure, encrypted journaling to track emotions over time.
- **Curated Playlists** – Soothing music recommendations via the Spotify API to aid relaxation.
- **Emotional Assessment Test** – AI-based self-assessment for emotional well-being, informed by insights from 60+ user feedback sessions.
- **User-Centric Design** – Simple, intuitive, responsive interface.

---

## ⚙️ Tech Stack

| Technology       | Purpose                                        |
|------------------|------------------------------------------------|
| Next.js          | Frontend framework (React-based)               |
| React.js         | UI components & state management               |
| Tailwind CSS     | Styling & responsive design                    |
| Express.js       | Backend API development                        |
| MongoDB          | NoSQL database for user data                   |
| Mongoose         | MongoDB ODM for data modeling                  |
| Gemini API       | AI-powered chatbot integrations                |
| Spotify API      | Music playlist integration                      |
| JWT & bcrypt     | Secure authentication & data protection        |

---

## 🖥️ Live Demo

- **Aluma App:** https://aluma-amber.vercel.app

---

## 📂 Repository

- **GitHub:** https://github.com/AdityaRalhan/Aluma

---

## 🧰 Prerequisites

- Node.js **v18+** (recommend LTS)
- npm or yarn
- A MongoDB instance (local or Atlas)
- Developer accounts/keys for Spotify and Gemini (see env vars below)

---

## 🛠 Getting Started (Local Setup)

### 1) Fork & Clone
```bash
# fork the repo on GitHub first, then:
git clone https://github.com/YOUR-USERNAME/Aluma.git
cd Aluma
````

### 2) Install Dependencies

```bash
npm install
# or
yarn install
```

### 3) Environment Variables

Create a file named `.env.local` in the project root and add:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 4) Run the Development Server

```bash
npm run dev
# visit http://localhost:3000
```

---

## 🤝 Contributing (GSSoC-friendly)

1. **Find an issue**: check open issues here → [https://github.com/AdityaRalhan/Aluma/issues](https://github.com/AdityaRalhan/Aluma/issues)
2. **Get assigned**: comment “I’d like to work on this” and wait for assignment.
3. **Create a feature branch**:

   ```bash
   git checkout -b feat/short-description
   ```
4. **Commit clearly**:

   ```bash
   git commit -m "feat: short description of change"
   ```
5. **Push & open a PR**:

   ```bash
   git push origin feat/short-description
   ```
6. In your PR description, mention the issue number and add a brief summary/screenshots if relevant.

**Tip:** Start with issues labeled **good first issue** / **beginner-friendly**.

---

## 👩‍🏫 Mentors (Contact)

| Name                  | LinkedIn                                                                 | GitHub                                    |
| --------------------- | ------------------------------------------------------------------------ | ----------------------------------------- |
| Divyanshi Kulshrestha | [LinkedIn](https://www.linkedin.com/in/divyanshi-kulshrestha-5ba319295/) | [GitHub](https://github.com/divyanshii10) | 
| Dipayan Ghosh         | [LinkedIn](https://www.linkedin.com/in/dipayan-ghosh-coder)              | [GitHub](https://github.com/Dip-1432)     |
| Arvind Singh          | [LinkedIn](https://www.linkedin.com/in/arvind-singh-92b88928a)           | [GitHub](https://github.com/04arvind)     |
| Sumit Sagar           | [LinkedIn](https://www.linkedin.com/in/sumit-sagar-8a8b39286)            | [GitHub](https://github.com/mostpalon3)   |
| Poorvika K B          | [LinkedIn](https://www.linkedin.com/in/poorvikakb)                       | —                                         |


---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.


