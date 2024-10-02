'use client'
import { Button } from '@nextui-org/react'
import React, { useState, useEffect, useRef } from 'react'

const Box = () => {
  const [x, setX] = useState(0);  // Left-right movement
  const [y, setY] = useState(0);  // Up-down movement
  const [isRound, setIsRound] = useState(false);

  const containerRef = useRef(null); // Reference to the main container
  const boxSize = 80; // Red box dimensions (height and width, assuming square)

  // Function to check and restrict movement within bounds
  const moveRight = (distance) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      if (x + distance + boxSize <= containerWidth) {
        setX(x + distance);
      }
    }
  };

  const moveLeft = (distance) => {
    if (x - distance >= 0) {
      setX(x - distance);
    }
  };

  const moveUp = (distance) => {
    if (y - distance >= 0) {
      setY(y - distance);
    }
  };

  const moveDown = (distance) => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      if (y + distance + boxSize <= containerHeight) {
        setY(y + distance);
      }
    }
  };

  // Toggle between round and square shape
  const toggleRound = () => setIsRound(!isRound);

  return (
    <div
      ref={containerRef} // Assigning the reference to the main container
      className="relative h-[100vh] w-full bg-fuchsia-600"
    >
      {/* Red Box */}
      <div
        className={`bg-red-400 h-20 w-20 absolute transition-all duration-500 ${
          isRound ? 'rounded-full' : ''
        }`}
        style={{
          transform: `translate(${x}px, ${y}px)`,  // Move according to state
        }}
      ></div>

      {/* Button Container */}
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2"
        style={{ zIndex: 10 }}  // Keep buttons on top of red box
      >
        <Button onClick={() => moveUp(50)}>Move Up</Button>
        <Button onClick={() => moveRight(50)}>Move Right</Button>
        <Button onClick={() => moveLeft(50)}>Move Left</Button>
        <Button onClick={() => moveDown(50)}>Move Down</Button>
        <Button onClick={toggleRound}>{isRound ? 'Square' : 'Round'}</Button>
      </div>
    </div>
  );
};

export default Box;
