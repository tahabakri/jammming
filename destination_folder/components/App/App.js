import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';function App() {
  // Mock search results
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Track Name 1', artist: 'Artist 1', album: 'Album 1' },
    { id: 2, name: 'Track Name 2', artist: 'Artist 2', album: 'Album 2' },
    { id: 3, name: 'Track Name 3', artist: 'Artist 3', album: 'Album 3' }
  ]);

  // Playlist state
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Add track to playlist
  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return; // Track already in playlist
    }
    setPlaylistTracks([...playlistTracks, track]);
  };

  // Remove track from playlist
  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
          />
        </div>
      </div>
    </div>
  );
}

export default App;