'use client'
import React, { useState } from 'react'

const MovieBookingSystem = () => {
  const [selectedSeats, setSelectedSeats] = useState([]) // Store selected seats in an array
  const [booking, setBooking] = useState(false)
  const totalSeats = 25

  const toggleSeatSelection = (id) => {
    if (booking || selectedSeats.length >= 5 && !selectedSeats.includes(id)) return; // Limit selection to 5 seats

    if (selectedSeats.includes(id)) {
      // If seat is already selected, remove it from the array
      setSelectedSeats(selectedSeats.filter(seat => seat !== id))
    } else {
      // Add seat to the array
      setSelectedSeats([...selectedSeats, id])
    }
  }

  return (
    <div className='px-[40%] mt-20 space-y-4'>
      <h1>Booking System</h1>
      <div className='grid h-40 w-40 gap-1 grid-cols-5 grid-rows-5'>
        {Array(totalSeats).fill(0).map((sit, idx) => (
          <div 
            key={idx} 
            onClick={() => toggleSeatSelection(idx)} 
            className={selectedSeats.includes(idx) ? 'bg-green-400' : 'bg-gray-400'}> 
            {sit}
          </div>
        ))}
      </div>
      <h1>Maximum number of seats a user can select is 5</h1>
      <h1>Total number of seats selected: {selectedSeats.length}</h1>
      <button>Confirm Selection</button>
    </div>
  )
}

export default MovieBookingSystem
