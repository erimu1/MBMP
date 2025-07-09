import React, { useState } from 'react';
import MoodSelector from './components/MoodSelector';
import MusicPlayer from './components/MusicPlayer';
import PlaylistView from './components/PlaylistView';
import './App.css';
import { RADIO_BROWSER_API } from './config';

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

  // Mood mappings for direct API calls
  const moodMappings = {
    happy: {
      tags: ['pop', 'dance', 'upbeat', 'party'],
      color: '#FFD700',
      gradient: ['#FFD700', '#FFA500']
    },
    sad: {
      tags: ['blues', 'melancholy', 'sad', 'emotional'],
      color: '#4682B4',
      gradient: ['#4682B4', '#2F4F4F']
    },
    energetic: {
      tags: ['rock', 'electronic', 'high energy', 'workout'],
      color: '#FF4500',
      gradient: ['#FF4500', '#FF6347']
    },
    calm: {
      tags: ['ambient', 'chill', 'relaxing', 'peaceful'],
      color: '#20B2AA',
      gradient: ['#20B2AA', '#48D1CC']
    },
    romantic: {
      tags: ['love', 'romantic', 'smooth', 'jazz'],
      color: '#FF69B4',
      gradient: ['#FF69B4', '#FFB6C1']
    },
    focused: {
      tags: ['instrumental', 'classical', 'study', 'concentration'],
      color: '#9370DB',
      gradient: ['#9370DB', '#BA55D3']
    },
    nostalgic: {
      tags: ['oldies', 'retro', 'vintage', '80s'],
      color: '#CD853F',
      gradient: ['#CD853F', '#DEB887']
    },
    adventurous: {
      tags: ['world', 'exotic', 'travel', 'adventure'],
      color: '#32CD32',
      gradient: ['#32CD32', '#90EE90']
    }
  };

  const handleMoodSelect = async (mood: string) => {
    setSelectedMood(mood);
    setLoading(true);
    
    try {
      const moodData = moodMappings[mood as keyof typeof moodMappings];
      const tag = moodData.tags[0]; // Use first tag for search
      
      // Call RadioBrowser API directly
      const response = await fetch(`${RADIO_BROWSER_API}/stations/bytag/${tag}?limit=20&hidebroken=true`);
      const stations = await response.json();
      
      if (stations && stations.length > 0) {
        // Transform RadioBrowser data to our format
        const transformedStations = stations.map((station: any, index: number) => ({
          id: station.stationuuid || `${mood}-${index}`,
          name: station.name || 'Unknown Station',
          artist: station.country || 'Radio Station',
          url: station.url_resolved || station.url,
          duration: '∞',
          mood: mood
        }));
        
        setPlaylist(transformedStations);
        setFilteredPlaylist(transformedStations);
        setCurrentTrack(transformedStations[0]);
        setCurrentMoodColor(moodData.color);
        setCurrentMoodGradient(moodData.gradient);
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
                  <div className="track-thumbnail">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="radio-icon">
                      <path d="M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V20C22,20.55 21.8,21 21.42,21.41C21.05,21.8 20.58,22 20,22H4C3.42,22 2.95,21.8 2.58,21.41C2.2,21 2,20.55 2,20V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.59,2.58C9,2.2 9.45,2 10,2H14C14.55,2 15,2.2 15.41,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V20H20V8H4M6,12C6.55,12 7,11.55 7,11C7,10.45 6.55,10 6,10C5.45,10 5,10.45 5,11C5,11.55 5.45,12 6,12M18,16H8V14H18V16M18,12H10V10H18V12Z" />
                    </svg>
                  </div>
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
