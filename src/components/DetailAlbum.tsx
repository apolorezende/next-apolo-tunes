import React from 'react';

const MusicCard = ( props : any) => {
  return (
    <div>
      <div>
        <h2>{props.trackName}</h2>
        <audio
          data-testid="audio-component"
          src={props.previewUrl}
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorite">
          <input
            checked={props.checked}
            type="checkbox"
            id="favorite"
            data-testid={`checkbox-music-${props.trackId}`}
            onChange={props.handleChange}
            value={props.trackId}
          />
          Favorita
        </label>
      </div>
    </div>
  );
};

export default MusicCard;