import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function AnimationPlayer() {
  const [sentence, setSentence] = useState('');
  const [animationFrame, setAnimationFrame] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
   
    socket.current = io('http://localhost:5001');

  
    socket.current.on('animation_frame', (frameBlob) => {
      const imageUrl = URL.createObjectURL(new Blob([frameBlob], { type: 'image/jpeg' }));
      setAnimationFrame(imageUrl); 
    });

    socket.current.on('animation_complete', () => {
      setIsAnimating(false);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);


  const handlePlayAnimation = async () => {
    if (sentence.trim() === '') return;

    setIsAnimating(true);
    setAnimationFrame(null); 

   
    try {
      const response = await fetch('http://localhost:5001/animation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence }),
      });

      if (response.ok) {
        console.log('Animation started');
      } else {
        console.error('Failed to start animation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Word Animation</h1>
      <textarea
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        placeholder="Type a sentence here..."
        disabled={isAnimating}
      />
      <button onClick={handlePlayAnimation} disabled={isAnimating}>
        Play Animation
      </button>
      <div>
        {animationFrame && <img src={animationFrame} alt="Animation Frame" />}
      </div>
    </div>
  );
}

export default AnimationPlayer;
