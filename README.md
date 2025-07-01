# Mood Based Music Player

A modern music player that selects music based on your current mood. Built with React and Node.js, designed to look like Spotify with a beautiful desktop interface.

![Mood Music Player](https://via.placeholder.com/800x400/667eea/white?text=Mood+Music+Player)

## 🎵 Features

- **� 5 Mood Categories**: Happy, Sad, Energetic, Relaxed, Angry
- **🎵 Real-time Streaming**: Uses RadioBrowser API for free music streaming
- **🎨 Spotify-inspired Design**: Beautiful, modern UI with dark theme
- **🎮 Full Player Controls**: Play, pause, next, previous, volume control
- **📱 Responsive Design**: Optimized for desktop use
- **🌈 Color-coded Moods**: Each mood has its own color and icon
- **🔊 Live Radio Stations**: Curated radio stations based on mood

## 🚀 Quick Start

### Method 1: Using Startup Script (Windows)
```bash
# Double-click start.bat or run in command prompt:
start.bat
```

### Method 2: Manual Start
```bash
# 1. Install dependencies
npm install
cd client && npm install

# 2. Start backend server (in root directory)
npm start

# 3. Start frontend (in new terminal, from client directory)
cd client
set PORT=3005
npm start
```

### Method 3: Using VS Code Tasks
1. Open the project in VS Code
2. Press `Ctrl+Shift+P`
3. Type "Tasks: Run Task"
4. Select "Start Development Server"

## 🌐 Access Points

- **Frontend Application**: http://localhost:3005
- **Backend API**: http://localhost:3502
- **API Endpoints**:
  - `GET /api/moods` - Get all available moods
  - `GET /api/music/:mood` - Get music for specific mood

## 🎭 Available Moods

| Mood | Icon | Color | Music Genres |
|------|------|-------|--------------|
| Happy | 😊 | Gold | Pop, Dance, Electronic, Funk |
| Sad | 😢 | Blue | Blues, Jazz, Classical, Ambient |
| Energetic | 🔥 | Orange | Rock, Metal, Punk, Electronic |
| Relaxed | 😌 | Green | Chill, Ambient, Classical, Jazz |
| Angry | 😠 | Red | Metal, Rock, Punk, Hardcore |

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **CSS3** with custom animations and gradients
- **Axios** for API communication
- **Modern Web APIs** (Audio API, Fetch API)

### Backend
- **Node.js** with Express.js
- **RadioBrowser API** (free, no authentication required)
- **CORS** enabled for cross-origin requests
- **Axios** for external API calls

### Styling
- **Custom CSS** with Spotify-inspired design
- **CSS Grid & Flexbox** for responsive layouts
- **CSS Variables** for theming
- **Gradient backgrounds** and glassmorphism effects

## 📁 Project Structure

```
spotify-api/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── MoodSelector.tsx
│   │   │   ├── PlaylistView.tsx
│   │   │   └── MusicPlayer.tsx
│   │   ├── App.tsx         # Main app component
│   │   └── index.tsx       # React entry point
│   ├── public/
│   └── package.json
├── server.js               # Express backend
├── package.json            # Backend dependencies
├── start.bat              # Windows startup script
├── .env                   # Environment variables
└── README.md              # This file
```

## 🎨 Design Features

- **Dark Theme**: Professional dark interface with accent colors
- **Glassmorphism**: Translucent elements with backdrop blur
- **Smooth Animations**: Hover effects and transitions
- **Grid Layout**: Spotify-like track listing with album art
- **Progress Bar**: Visual audio progress indicator
- **Volume Control**: Slider-based volume adjustment

## 🔧 Configuration

### Environment Variables (.env)
```env
NODE_ENV=development
# PORT is automatically assigned to 3502
```

### API Configuration
The app uses RadioBrowser API which requires no authentication:
- Base URL: `https://de1.api.radio-browser.info`
- No API keys required
- Free tier with reasonable rate limits

## 🎵 How It Works

1. **Mood Selection**: User selects their current mood from the sidebar
2. **API Request**: Frontend sends mood to backend API
3. **Music Curation**: Backend maps mood to music genres and fetches stations
4. **Stream Delivery**: Radio stations are returned with metadata
5. **Audio Playback**: HTML5 audio element streams the selected station
6. **Player Controls**: Full control over playback, volume, and track navigation

## 🐛 Troubleshooting

### Port Already in Use
If you get "EADDRINUSE" errors:
```bash
# Check what's using the port
netstat -ano | findstr :3502

# Kill the process (replace PID)
taskkill /PID [PID] /F
```

### Audio Not Playing
- Check if the radio station URL is valid
- Try selecting a different mood/station
- Ensure browser allows audio autoplay
- Check browser console for CORS errors

### API Not Responding
- Verify backend server is running on port 3502
- Check network connectivity
- RadioBrowser API might be temporarily unavailable

## 🔮 Future Enhancements

- [ ] **User Preferences**: Save favorite moods and stations
- [ ] **Custom Playlists**: Allow users to create custom mood playlists
- [ ] **Mood Detection**: Camera-based facial recognition for automatic mood detection
- [ ] **Social Features**: Share mood playlists with friends
- [ ] **Mobile App**: Native iOS/Android applications
- [ ] **Offline Mode**: Download tracks for offline listening
- [ ] **AI Recommendations**: Machine learning for better music suggestions

## 📝 License

MIT License - see LICENSE file for details.

## 👨‍💻 Author

**Erim Uludag**  
Klas: D2C  
Project: Interface & Scripting Combination  
Date: May 2025

## 🙏 Acknowledgments

- RadioBrowser.info for providing free radio station API
- React team for the excellent frontend framework
- Express.js for the lightweight backend framework
- Spotify for design inspiration

---

*"Music is the language of emotions. Let your mood guide your musical journey."*
