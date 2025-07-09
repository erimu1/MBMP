import React from 'react';
import { Track } from '../App';
import './PlaylistView.css';

interface PlaylistViewProps {
  playlist: Track[];
  currentTrack: Track | null;
  onTrackSelect: (track: Track) => void;
  selectedMood: string;
  loading: boolean;
  searchQuery?: string;
}

const PlaylistView: React.FC<PlaylistViewProps> = ({ 
  playlist, 
  currentTrack, 
  onTrackSelect, 
  selectedMood,
  loading,
  searchQuery 
}) => {
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={index} style={{ backgroundColor: 'rgba(255, 255, 0, 0.3)', fontWeight: 'bold' }}>{part}</span> : 
        part
    );
  };

  const getCountryFlag = (countryCode: string) => {
    if (!countryCode || countryCode === 'XX') return '🌍';
    try {
      return String.fromCodePoint(...countryCode.toUpperCase().split('').map(char => char.charCodeAt(0) + 0x1F1A5));
    } catch {
      return '🌍';
    }
  };

  if (loading) {
    return (
      <div className="playlist-view">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <h3>Finding Your Perfect Soundtrack</h3>
          <p>Searching through thousands of global radio stations...</p>
          <div className="loading-progress">
            <div className="loading-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedMood) {
    return (
      <div className="playlist-view">
        <div className="empty-state">
        </div>
      </div>
    );
  }

  if (playlist.length === 0) {
    return (
      <div className="playlist-view">
        <div className="empty-playlist">
          <h3>{searchQuery ? 'No results found' : 'No music found'}</h3>
          <p>
            {searchQuery 
              ? `No tracks match "${searchQuery}". Try different keywords or clear your search.`
              : 'Try selecting a different mood or check your internet connection.'
            }
          </p>
          {searchQuery && (
            <button 
              onClick={() => window.location.reload()} 
              className="retry-btn"
            >
              Clear search and try again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="playlist-view">
      <div className="playlist-header">
        <h2>
          {searchQuery ? (
            <>
              Search Results for "{searchQuery}"
            </>
          ) : (
            <>
              {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Vibes
            </>
          )}
        </h2>
      </div>

      <div className="playlist-grid">
        <div className="grid-header">
          <span className="col-title">STATION</span>
          <span className="col-title">LOCATION</span>
          <span className="col-title">GENRE</span>
        </div>

        {playlist.map((track, index) => (
          <div
            key={track.id}
            className={`track-row ${currentTrack?.id === track.id ? 'active' : ''}`}
            onClick={() => onTrackSelect(track)}
          >
            <div className="track-info">
              <div className="track-number">{index + 1}</div>
              <div className="track-image">
                <svg viewBox="0 0 24 24" fill="currentColor" className="radio-icon">
                  <path d="M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V20C22,20.55 21.8,21 21.42,21.41C21.05,21.8 20.58,22 20,22H4C3.42,22 2.95,21.8 2.58,21.41C2.2,21 2,20.55 2,20V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.59,2.58C9,2.2 9.45,2 10,2H14C14.55,2 15,2.2 15.41,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V20H20V8H4M6,12C6.55,12 7,11.55 7,11C7,10.45 6.55,10 6,10C5.45,10 5,10.45 5,11C5,11.55 5.45,12 6,12M18,16H8V14H18V16M18,12H10V10H18V12Z" />
                </svg>
              </div>
              <div className="track-details">
                <div className="track-name">
                  {highlightText(track.name, searchQuery || '')}
                </div>
                <div className="track-subtitle">
                  {track.language && track.language !== 'Unknown' ? track.language : 'International'} • 
                  {track.bitrate && track.bitrate !== 'Variable' ? ` ${track.bitrate}kbps` : ' Quality Audio'}
                </div>
              </div>
            </div>
            
            <div className="track-location">
              <span className="country-flag">{getCountryFlag(track.countryCode || '')}</span>
              <span className="track-artist">
                {highlightText(track.artist, searchQuery || '')}
              </span>
            </div>
            
            <div className="track-album">
              {highlightText(track.album, searchQuery || '')}
            </div>
          </div>
        ))}
      </div>
      
      <div className="playlist-footer">
        <p>Tip: Click on any station to start playing. Use the search above to filter results.</p>
      </div>
    </div>
  );
};

export default PlaylistView;
