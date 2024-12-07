import React, { useState } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist({ playlistName, playlistTracks, onRemove }) {
  const [localPlaylistName, setLocalPlaylistName] = useState(playlistName);

  const handleNameChange = (event) => {
    setLocalPlaylistName(event.target.value);
  };

  return (
    <div className="Playlist">
      <input value={localPlaylistName} onChange={handleNameChange} />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;
