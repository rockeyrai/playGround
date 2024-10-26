'use client'
import React, { useRef, useState, useEffect } from 'react';

const GiftSystem = () => {
  const [data, setData] = useState(null);
  const nameRef = useRef(null);
  const giftSet = ['mobile', 'laptop', 'house', 'guitar'];

  useEffect(() => {
    const savedData = localStorage.getItem('giftData');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      setData([]);
    }
  }, []);

  useEffect(() => {
    if (data !== null) {
      localStorage.setItem('giftData', JSON.stringify(data));
    }
  }, [data]);

  const enterName = () => {
    const newName = nameRef.current.value;
    if (newName) {
      setData((prevData) => [...prevData, { name: newName, gift: '' }]);
      nameRef.current.value = "";
    }
  };

  const giveGift = () => {
    setData((prevData) =>
      prevData.map((entry) => ({
        ...entry,
        gift: giftSet[Math.floor(Math.random() * giftSet.length)] // Assign a random gift
      }))
    );
  };

  const reset = () => {
    setData([]); // Reset the state
    localStorage.clear(); // Clear localStorage
  };

  const shuffleGifts = () => {
    // Check if all entries have a gift assigned
    const allHaveGifts = data && data.every(entry => entry.gift);

    if (allHaveGifts) {
      setData((prevData) => {
        return prevData.map((entry) => ({
          ...entry,
          gift: giftSet[Math.floor(Math.random() * giftSet.length)] // Shuffle gifts for each entry
        }));
      });
    } else {
      alert('Please assign gifts to all participants before shuffling!');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] space-y-5">
      <h1>Gift Handler System</h1>
      <div>
        <input ref={nameRef} placeholder="Enter Name" />
        <button onClick={enterName}>Enter</button>
        <div>
          {data &&
            data.map((entry, idx) => (
              <div key={idx}>
                <span>{entry.name}</span> - <span>{entry.gift || "No gift assigned"}</span>
              </div>
            ))
          }
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={giveGift}>Assign Gift</button>
        <button onClick={shuffleGifts}>Shuffle Gifts</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default GiftSystem;
