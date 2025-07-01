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
              <img 
                src={track.image} 
                alt={track.name} 
                className="track-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://picsum.photos/300/300?random=${index + Date.now()}`;
                }}
              />
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
