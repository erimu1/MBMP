# MoodTunes 🎵

A professional, mood-based music player that curates radio stations based on your current emotional state. Built with React, TypeScript, and Node.js.

## 🌟 Features

- **Mood-Based Selection**: Choose from 8 different moods (Happy, Sad, Energetic, Calm, etc.)
- **Smart Aggregation**: Multi-strategy data collection from RadioBrowser API
- **Real-time Search**: Instant filtering of stations
- **Professional UI**: Modern glassmorphism design with smooth animations
- **Responsive**: Works on desktop and mobile devices

## 🚀 Live Demo

**Frontend**: [https://erimu1.github.io/MBMP](https://erimu1.github.io/MBMP)
**Backend**: Deployed on Render (auto-deployed from main branch)

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- CSS Grid & Flexbox
- Glassmorphism UI design
- HTML5 Audio API

**Backend:**
- Node.js & Express
- RadioBrowser API integration
- Multi-strategy data aggregation
- Smart deduplication algorithms

## 📱 Screenshots

*Professional, clean interface with mood-based gradients and glassmorphism effects*

## 🏗️ Architecture

- **Frontend**: React SPA deployed on GitHub Pages
- **Backend**: Express API deployed on Render
- **Data**: Real-time radio stations from RadioBrowser API
- **Deployment**: Automated CI/CD with GitHub Actions

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/erimu1/MBMP.git
cd MBMP

# Install dependencies
npm install
cd client && npm install

# Start development servers
npm run dev
```

## 📝 API Endpoints

- `GET /api/music/:mood` - Get stations for a specific mood
- `GET /api/moods` - Get all available moods

## 🎨 Design Features

- **Glassmorphism**: Modern blur effects and transparency
- **Dynamic Backgrounds**: Mood-based gradient themes
- **Professional Controls**: Custom SVG icons with hollow styling
- **Smooth Animations**: CSS transitions and transforms
- **Responsive Grid**: Adaptive layout for all screen sizes

---

Built with ❤️ by [Erim Uludag](https://github.com/erimu1)
