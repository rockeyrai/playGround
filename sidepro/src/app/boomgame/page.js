"use client";
import React, { useState } from 'react';
import styles from './page.css';

const BoomGame = () => {
  const numCols = 8;
  const numRows = 8;
  const totalCells = numCols * numRows;

  //  generate bombs and start game 
  const initializeGame = () => {
    const generateBoomNums = () => {
      let boomNums = [];
      while (boomNums.length < 20) {
        let randomNum = Math.floor(Math.random() * totalCells);
        if (!boomNums.includes(randomNum)) {
          boomNums.push(randomNum);
        }
      }
      return boomNums;
    };
    //get the game number 
    const boomNums = generateBoomNums();
    const initialGameNums = Array.from({ length: totalCells }, (_, index) =>
      boomNums.includes(index) ? 'b' : 0
    );
    // alternative of the above code 

    // new Array(totalCells).fill(0).map((_, index) =>
    //   boomNums.includes(index) ? 'b' : 0
    // );


    //reset btn need this and the initialGameNums is a block scpoe so 
    //state is use in the function
    setGameNums(initialGameNums);
    setRevealed(Array(totalCells).fill(false));
    setIsGameOver(false);
  };

  const [gameNums, setGameNums] = useState([]);  // will provide the game number or 'b'
  const [revealed, setRevealed] = useState();  //  revealed false is give ''(empty) true give number or 'b'
  const [isGameOver, setIsGameOver] = useState(false); // on clicking on 'b' isGameOver change to ture 

  //auto call the function when compoent and prop is render. [] is use to call once only at the start 
  React.useEffect(() => {
    initializeGame();
  }, []);

  const surroundingNums = (index) => {
    if ([15, 23, 31, 39, 47, 55].includes(index)) {  //right side number case
      return [
        index - numCols,        // top
      index - numCols - 1,     // top-left
      index - 1,               // left
      index + numCols,         // below
      index + numCols - 1,     // bottom-left
      ];
    }else if([1,2,3,4,5,6].includes(index)){    // top side number case
      return [
        index - 1,               // top
        index + 1,               // right
        index + numCols,         // below
        index + numCols - 1,     // bottom-left
        index + numCols + 1      // bottom-right
      ]
    }else if([8,16,24,32,40,48].includes(index)){   // left side number case
      return [
        index - numCols,         // top
        index - numCols + 1,     // top-right
        index + 1,               // right
        index + numCols,         // below  
        index + numCols + 1      // bottom-right
      ]
    }else if([57,57,59,60,61,62].includes(index)){    // bottom side number case
      return [
        index - numCols,         // top
        index - numCols - 1,     // top-left
        index - numCols + 1,     // top-right
        index - 1,               // left
        index + 1,               // right
      ]
    }else{                                                //middle number 
      return [
      index - numCols,         // top
      index - numCols - 1,     // top-left
      index - numCols + 1,     // top-right
      index - 1,               // left
      index + 1,               // right
      index + numCols,         // below
      index + numCols - 1,     // bottom-left
      index + numCols + 1      // bottom-right
      ];
    }
  };
  

  //onClick will triger this fucntion

  const handleClick = (index) => {
    if (isGameOver) return;

    const newRevealed = [...revealed];  //useState should not direclty change the state so the revealed is copyed
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (gameNums[index] === 'b') {
      setIsGameOver(true);
    } else {
      const surroundingIndices = surroundingNums(index);
      let bombCount = 0;

      surroundingIndices.forEach(i => {
        if (gameNums[i] === 'b') {
          bombCount++;
        }
      });

     
      const newGameNums = [...gameNums];
      newGameNums[index] = bombCount; 
      setGameNums(newGameNums);     
    }
  };

  // Reset the game
  const handleRestart = () => {
    initializeGame();
  };

  return (
    <div className={`h-[100vh] w-full flex flex-col items-center justify-center ${isGameOver ? 'bg-red-600' : 'bg-purple-600'}`}>
      <div className='h-96 w-96 bg-orange-300 grid grid-cols-8 grid-rows-8 '>
        {gameNums.map((num, index) => (
          <div 
            key={index} 
            className='flex items-center justify-center border cursor-pointer' 
            onClick={() => handleClick(index)}
          >
            {revealed[index] ? (num === 'b' ? '💣' : num) : ''}
          </div>
        ))}
      </div>
      {isGameOver && <div className=" text-white text-3xl">Game Over</div>}
      <button 
        onClick={handleRestart} 
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Restart Game
      </button>
    </div>
  );
};

export default BoomGame;
