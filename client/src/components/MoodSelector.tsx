import React, { useState, useEffect } from 'react';
import './MoodSelector.css';

interface Mood {
  name: string;
  color: string;
  icon: string;
  tags: string[];
  description?: string;
  gradient?: string[];
}

interface MoodSelectorProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
  loading: boolean;
  currentMoodColor?: string;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodSelect, loading, currentMoodColor }) => {
  const [moods, setMoods] = useState<Mood[]>([]);

  const getMoodIcon = (moodName: string) => {
    const iconProps = {
      width: "24",
      height: "24",
      fill: "currentColor",
      className: "mood-icon"
    };

    switch (moodName.toLowerCase()) {
      case 'happy':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case 'sad':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 8C9.33 8 10 8.67 10 9.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8zM12 18c-2.28 0-4.22-1.66-5-4h10c-.78 2.34-2.72 4-5 4zm3.5-7c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
        );
      case 'energetic':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
          </svg>
        );
      case 'relaxed':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 4.7L16.3 12H15v6H9v-6H7.7L12 7.7z"/>
          </svg>
        );
      case 'angry':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 15.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm8 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
        );
      case 'romantic':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      case 'nostalgic':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        );
      case 'focused':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      default:
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
    }
  };

  useEffect(() => {
    // Hardcoded moods data - no backend needed
    const moodsData = [
      { name: 'happy', color: '#FFD700', gradient: ['#FFD700', '#FFA500'], icon: '😊', tags: ['pop', 'dance', 'upbeat'] },
      { name: 'sad', color: '#4682B4', gradient: ['#4682B4', '#2F4F4F'], icon: '😢', tags: ['blues', 'melancholy'] },
      { name: 'energetic', color: '#FF4500', gradient: ['#FF4500', '#FF6347'], icon: '⚡', tags: ['rock', 'electronic'] },
      { name: 'calm', color: '#20B2AA', gradient: ['#20B2AA', '#48D1CC'], icon: '🧘', tags: ['ambient', 'chill'] },
      { name: 'romantic', color: '#FF69B4', gradient: ['#FF69B4', '#FFB6C1'], icon: '💕', tags: ['love', 'romantic'] },
      { name: 'focused', color: '#9370DB', gradient: ['#9370DB', '#BA55D3'], icon: '🎯', tags: ['instrumental', 'classical'] },
      { name: 'nostalgic', color: '#CD853F', gradient: ['#CD853F', '#DEB887'], icon: '📻', tags: ['oldies', 'retro'] },
      { name: 'adventurous', color: '#32CD32', gradient: ['#32CD32', '#90EE90'], icon: '🌍', tags: ['world', 'exotic'] }
    ];
    
    setMoods(moodsData);
  }, []);

  const formatMoodName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="mood-selector">
      <div className="mood-grid">
        {moods.map((mood) => (
          <button
            key={mood.name}
            className={`mood-card ${selectedMood === mood.name ? 'active' : ''}`}
            onClick={() => onMoodSelect(mood.name)}
            style={{ 
              '--mood-color': mood.color,
              '--mood-gradient-start': mood.gradient?.[0] || mood.color,
              '--mood-gradient-end': mood.gradient?.[1] || mood.color
            } as React.CSSProperties}
            disabled={loading}
          >
            <div className="mood-icon-container">
              {getMoodIcon(mood.name)}
            </div>
            <div className="mood-name">{formatMoodName(mood.name)}</div>
            {loading && selectedMood === mood.name && (
              <div className="loading-spinner"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
