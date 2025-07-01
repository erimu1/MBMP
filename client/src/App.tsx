import React, { useState } from 'react';
import MoodSelector from './components/MoodSelector';
import MusicPlayer from './components/MusicPlayer';
import PlaylistView from './components/PlaylistView';
import './App.css';
import { API_BASE_URL } from './config';

export interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  url: string;
  image: string;
  release: string;
  clickcount?: number;
  tags?: string[];
  language?: string;
  bitrate?: string | number;
  countryCode?: string;
}

export interface Mood {
  name: string;
  color: string;
  icon: string;
  tags: string[];
}

const App: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaylist, setFilteredPlaylist] = useState<Track[]>([]);
  const [currentMoodColor, setCurrentMoodColor] = useState('#667eea');
  const [currentMoodGradient, setCurrentMoodGradient] = useState(['#667eea', '#764ba2']);

  const handleMoodSelect = async (mood: string) => {
    setSelectedMood(mood);
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/music/${mood}`);
      const data = await response.json();
      
      if (data.stations && data.stations.length > 0) {
        setPlaylist(data.stations);
        setFilteredPlaylist(data.stations);
        setCurrentTrack(data.stations[0]);
        setCurrentMoodColor(data.moodData.color);
        setCurrentMoodGradient(data.moodData.gradient || [data.moodData.color, '#764ba2']);
      }
    } catch (error) {
      console.error('Error fetching music:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPlaylist(playlist);
    } else {
      const filtered = playlist.filter(track =>
        track.name.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase()) ||
        track.album.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPlaylist(filtered);
    }
  };

  // Reset search when mood changes
  const handleMoodSelectWithReset = async (mood: string) => {
    setSearchQuery('');
    await handleMoodSelect(mood);
  };

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentPlaylist = filteredPlaylist.length > 0 ? filteredPlaylist : playlist;
    if (currentPlaylist.length > 0 && currentTrack) {
      const currentIndex = currentPlaylist.findIndex(track => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % currentPlaylist.length;
      setCurrentTrack(currentPlaylist[nextIndex]);
    }
  };

  const handlePrevious = () => {
    const currentPlaylist = filteredPlaylist.length > 0 ? filteredPlaylist : playlist;
    if (currentPlaylist.length > 0 && currentTrack) {
      const currentIndex = currentPlaylist.findIndex(track => track.id === currentTrack.id);
      const prevIndex = currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1;
      setCurrentTrack(currentPlaylist[prevIndex]);
    }
  };

  return (
    <div 
      className="app" 
      style={{ 
        '--mood-bg-color': currentMoodColor,
        '--mood-gradient-start': currentMoodGradient[0],
        '--mood-gradient-end': currentMoodGradient[1]
      } as React.CSSProperties}
    >
      <div className="app-container">
        <header className="app-header">
          <div className="logo">
            <h1>MoodTunes</h1>
          </div>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search for music..." 
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="clear-search-btn" 
                onClick={() => handleSearch('')}
                title="Clear search"
              >
                Clear
              </button>
            )}
          </div>
        </header>

        <div className="app-content">
          <aside className="sidebar">
            <MoodSelector 
              selectedMood={selectedMood} 
              onMoodSelect={handleMoodSelectWithReset}
              loading={loading}
              currentMoodColor={currentMoodColor}
            />
          </aside>

          <main className="main-content">
            <PlaylistView 
              playlist={filteredPlaylist.length > 0 ? filteredPlaylist : playlist}
              currentTrack={currentTrack}
              onTrackSelect={handleTrackSelect}
              selectedMood={selectedMood}
              loading={loading}
              searchQuery={searchQuery}
            />
          </main>

          <aside className="right-sidebar">
            <div className="now-playing">
              <h3>Now Playing</h3>
              {currentTrack && (
                <div className="current-track-info">
                  <img src={currentTrack.image} alt={currentTrack.name} />
                  <div className="track-details">
                    <h4>{currentTrack.name}</h4>
                    <p>{currentTrack.artist}</p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        <footer className="player-footer">
          <MusicPlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={0}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onTimeChange={setCurrentTime}
          />
        </footer>
      </div>
    </div>
  );
};

export default App;
