'use client'
import React, { useEffect, useState } from 'react';

const wordGame = () => {

  const keyBoard = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const question = {
    japan: 'Which country is known as the “Land of the Rising Sun”?',
    china: 'Which country has the largest population in the world?',
    argentina: 'Which country won the FIFA World Cup in 2022?',
    basketball: ' In which sport would you perform a slam dunk?'
  };
  
  const arrayAnswer = Object.keys(question);
  const [answer, setAnswer] = useState(arrayAnswer[Math.floor(Math.random() * arrayAnswer.length)]); 
  const [hang, setHang] = useState([]);
  const [userAns, setUserAns] = useState(Array(answer.length).fill('_'));
  const [gameOver, setGameOver] = useState(false); 


  useEffect(() => {
    if (userAns.join('') === answer) {
      setGameOver(true); 
    }
  }, [userAns]);


  const check = (abc) => {
    if (!gameOver) {
      if (answer.includes(abc)) {
        const newAns = [...userAns];
        answer.split('').forEach((letter, idx) => {
          if (letter === abc) {
            newAns[idx] = abc;
          }
        });
        setUserAns(newAns);
    
      } else {
        setHang([...hang, abc]);
        if (hang.length + 1 >= 6) {
          setGameOver(true);
        }
      }
    }
  };

 
  const resetGame = () => {
    const newAnswer = arrayAnswer[Math.floor(Math.random() * arrayAnswer.length)];
    setAnswer(newAnswer);
    setUserAns(Array(newAnswer.length).fill('_')); 
    setHang([]); 
    setGameOver(false); 
  };

  return (
    <div className='flex horrHouse p-5'>
      <div>
        <div className='h-[150px] w-auto text-2xl flex flex-col gap-2 justify-center text-white' >
          <h2>Question: {question[answer]}</h2>
          <h3>Answer: {userAns.join(' ')}</h3>
        </div>
        <div className='grid grid-cols-8  w-[600px] mt-4'>
          {keyBoard.map((item) => (
            <div
              onClick={() => check(item)} 
              className={`p-4 border mb-2 mr-2 rounded box-content text-xltext-center cursor-pointer  hover:text-2xl h-[30px] w-[30px] font-bold ${gameOver ? 'pointer-events-none' : 'pointer-events-auto' } ${gameOver ? 'bg-white text-black' : 'bg-transparent  text-white '}`} 
              
            >
              {item}
            </div>
          ))}
        </div>
        {gameOver && (
          <div>
            <button onClick={resetGame} className='mt-5 p-2 bg-transparent border text-white rounded'> {hang.length >= 6 ? 'Play Again' : 'Next Question'}</button>
          </div>
        )}
      </div>
      <div className='text-white flex flex-col justify-start items-end pt-20 text-xl  gap-4 w-[50%]'>      
          <h3 className='border p-1 rounded border-white' > Mistakes: {hang.join(', ')}</h3>
          {gameOver && (
            <h3>{hang.length >= 6 ? `You lost! The answer was ${answer}`  : 'You won!'}</h3>
          )} 
         

      </div>   
    </div>
  );
};

export default wordGame;
