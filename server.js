const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3502;

app.use(cors());
app.use(express.json());

// Enhanced mood-based music data with multiple API sources and more variety
const moodMappings = {
  happy: {
    tags: ['pop', 'dance', 'electronic', 'funk', 'house', 'disco', 'upbeat', 'party', 'feel good', 'summer', 'celebration', 'sunshine'],
    genres: ['pop', 'dance', 'electronic', 'funk', 'house', 'disco', 'reggae', 'latin'],
    countries: ['US', 'UK', 'DE', 'FR', 'BR'],
    color: '#FFD700',
    gradient: ['#FFD700', '#FFA500'],
    description: 'Uplifting and energetic music to boost your mood'
  },
  sad: {
    tags: ['blues', 'jazz', 'classical', 'ambient', 'ballad', 'acoustic', 'indie', 'slow', 'melancholy', 'emotional', 'piano', 'strings'],
    genres: ['blues', 'jazz', 'classical', 'ambient', 'indie', 'folk', 'soul'],
    countries: ['US', 'UK', 'FR', 'NO', 'CA'],
    color: '#4169E1',
    gradient: ['#4169E1', '#1E90FF'],
    description: 'Melancholic and emotional music for reflection'
  },
  energetic: {
    tags: ['rock', 'metal', 'punk', 'electronic', 'techno', 'drum', 'bass', 'hardcore', 'workout', 'adrenaline', 'intense', 'powerful'],
    genres: ['rock', 'metal', 'punk', 'electronic', 'techno', 'edm', 'hardstyle'],
    countries: ['US', 'UK', 'DE', 'NL', 'SE'],
    color: '#FF4500',
    gradient: ['#FF4500', '#DC143C'],
    description: 'High-energy music to pump you up'
  },
  relaxed: {
    tags: ['chill', 'ambient', 'classical', 'jazz', 'lounge', 'new age', 'meditation', 'soft', 'peaceful', 'calm', 'spa', 'nature'],
    genres: ['chill', 'ambient', 'classical', 'jazz', 'lounge', 'world', 'instrumental'],
    countries: ['FR', 'IT', 'JP', 'NO', 'CA'],
    color: '#90EE90',
    gradient: ['#90EE90', '#32CD32'],
    description: 'Calm and peaceful music for relaxation'
  },
  angry: {
    tags: ['metal', 'rock', 'punk', 'hardcore', 'industrial', 'grunge', 'alternative', 'heavy', 'aggressive', 'intense', 'raw', 'loud'],
    genres: ['metal', 'rock', 'punk', 'hardcore', 'industrial', 'grunge', 'thrash'],
    countries: ['US', 'UK', 'DE', 'SE', 'FI'],
    color: '#DC143C',
    gradient: ['#DC143C', '#8B0000'],
    description: 'Intense and powerful music to channel your anger'
  },
  romantic: {
    tags: ['love', 'romantic', 'ballad', 'soft rock', 'jazz', 'r&b', 'soul', 'smooth', 'intimate', 'valentine', 'date night', 'tender'],
    genres: ['r&b', 'soul', 'jazz', 'soft rock', 'pop', 'latin', 'smooth jazz'],
    countries: ['US', 'FR', 'IT', 'BR', 'UK'],
    color: '#FF69B4',
    gradient: ['#FF69B4', '#FF1493'],
    description: 'Romantic and tender music for intimate moments'
  },
  nostalgic: {
    tags: ['80s', '90s', 'retro', 'oldies', 'classic rock', 'vintage', 'throwback', 'memories', 'classic', 'golden', 'timeless', 'past'],
    genres: ['classic rock', 'oldies', '80s', '90s', 'disco', 'new wave', 'synthwave'],
    countries: ['US', 'UK', 'DE', 'FR', 'AU'],
    color: '#DDA0DD',
    gradient: ['#DDA0DD', '#9370DB'],
    description: 'Classic hits that bring back memories'
  },
  focused: {
    tags: ['instrumental', 'study', 'concentration', 'ambient', 'minimal', 'electronic', 'lo-fi', 'downtempo', 'productivity', 'work', 'focus', 'deep'],
    genres: ['instrumental', 'ambient', 'electronic', 'classical', 'lo-fi', 'downtempo', 'minimal'],
    countries: ['JP', 'KR', 'DE', 'NO', 'US'],
    color: '#20B2AA',
    gradient: ['#20B2AA', '#008B8B'],
    description: 'Music to enhance concentration and productivity'
  }
};

// Get stations by mood using multiple API calls for maximum variety
app.get('/api/music/:mood', async (req, res) => {
  try {
    const mood = req.params.mood;
    const moodData = moodMappings[mood];
    
    if (!moodData) {
      return res.status(400).json({ error: 'Invalid mood' });
    }

    let allStations = [];
    
    // Strategy 1: Search by tags (more comprehensive now)
    for (const tag of moodData.tags.slice(0, 6)) { // Use more tags for variety
      try {
        const response = await axios.get(`https://de1.api.radio-browser.info/json/stations/bytag/${tag}`, {
          params: {
            limit: 20,
            order: 'clickcount',
            reverse: 'true'
          }
        });
        
        if (response.data && response.data.length > 0) {
          allStations.push(...response.data);
        }
      } catch (error) {
        console.log(`Failed to fetch stations for tag: ${tag}`);
      }
    }

    // Strategy 2: Search by genres
    for (const genre of moodData.genres.slice(0, 4)) {
      try {
        const response = await axios.get(`https://de1.api.radio-browser.info/json/stations/search`, {
          params: {
            tag: genre,
            limit: 15,
            order: 'clickcount',
            reverse: 'true'
          }
        });
        
        if (response.data && response.data.length > 0) {
          allStations.push(...response.data);
        }
      } catch (error) {
        console.log(`Failed to fetch stations for genre: ${genre}`);
      }
    }

    // Strategy 3: Search by country + genre combination for geographic diversity
    for (const country of moodData.countries.slice(0, 3)) {
      for (const genre of moodData.genres.slice(0, 2)) {
        try {
          const response = await axios.get(`https://de1.api.radio-browser.info/json/stations/search`, {
            params: {
              countrycode: country,
              tag: genre,
              limit: 8,
              order: 'clickcount',
              reverse: 'true'
            }
          });
          
          if (response.data && response.data.length > 0) {
            allStations.push(...response.data);
          }
        } catch (error) {
          console.log(`Failed to fetch stations for ${country}/${genre}`);
        }
      }
    }

    // Strategy 4: Get top global stations that might match the mood
    try {
      const response = await axios.get(`https://de1.api.radio-browser.info/json/stations/topvote`, {
        params: {
          limit: 30
        }
      });
      
      if (response.data && response.data.length > 0) {
        // Filter top stations by mood tags
        const relevantStations = response.data.filter(station => 
          station.tags && moodData.tags.some(tag => 
            station.tags.toLowerCase().includes(tag.toLowerCase())
          )
        );
        allStations.push(...relevantStations);
      }
    } catch (error) {
      console.log('Failed to fetch top stations');
    }

    // Filter and deduplicate stations with enhanced criteria and better genre matching
    const uniqueStations = [];
    const seenUrls = new Set();
    const seenNames = new Set();
    
    for (const station of allStations) {
      if (station.url_resolved && station.name && 
          !seenUrls.has(station.url_resolved) &&
          !seenNames.has(station.name.toLowerCase()) &&
          station.clickcount > 5 && // More lenient for variety
          station.name.length > 2) { // Avoid single-letter names
        seenUrls.add(station.url_resolved);
        seenNames.add(station.name.toLowerCase());
        
        // Enhanced genre classification based on station tags and name
        let bestGenre = 'Music';
        const stationInfo = `${station.name} ${station.tags || ''}`.toLowerCase();
        
        if (moodData.tags.some(tag => stationInfo.includes(tag.toLowerCase()))) {
          const matchingTag = moodData.tags.find(tag => stationInfo.includes(tag.toLowerCase()));
          bestGenre = matchingTag.charAt(0).toUpperCase() + matchingTag.slice(1);
        } else if (moodData.genres.some(genre => stationInfo.includes(genre.toLowerCase()))) {
          const matchingGenre = moodData.genres.find(genre => stationInfo.includes(genre.toLowerCase()));
          bestGenre = matchingGenre.charAt(0).toUpperCase() + matchingGenre.slice(1);
        }
        
        uniqueStations.push({
          ...station,
          matchedGenre: bestGenre
        });
      }
    }

    // Sort by popularity and take top 40 (increased from 25)
    const sortedStations = uniqueStations
      .sort((a, b) => b.clickcount - a.clickcount)
      .slice(0, 40);

    const tracks = sortedStations.map((station, index) => ({
      id: station.stationuuid || `station-${index}`,
      name: station.name.length > 50 ? station.name.substring(0, 50) + '...' : station.name,
      artist: station.country ? `${station.country} Radio` : 'International Radio',
      album: station.matchedGenre || moodData.tags[0].charAt(0).toUpperCase() + moodData.tags[0].slice(1),
      url: station.url_resolved,
      image: station.favicon || `https://picsum.photos/300/300?random=${index + Date.now()}`,
      release: new Date().getFullYear().toString(),
      clickcount: station.clickcount,
      language: station.language || 'Unknown',
      bitrate: station.bitrate || 'Variable',
      countryCode: station.countrycode || 'XX'
    }));

    res.json({
      mood: mood,
      moodData: moodData,
      stations: tracks,
      totalFound: tracks.length,
      searchStrategies: ['tags', 'genres', 'country-combinations', 'top-global'],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching music:', error);
    res.status(500).json({ error: 'Failed to fetch music' });
  }
});

// Get all available moods
app.get('/api/moods', (req, res) => {
  res.json(Object.keys(moodMappings).map(mood => ({
    name: mood,
    ...moodMappings[mood]
  })));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
