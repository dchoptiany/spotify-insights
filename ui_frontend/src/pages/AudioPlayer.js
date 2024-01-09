import React from 'react';

const AudioPlayer = ({ previewUrl }) => {
  return (
    <div>
      <audio controls >
        <source src={previewUrl} type="audio/mp3"  />
      </audio>
    </div>
  );
};

export default AudioPlayer;
