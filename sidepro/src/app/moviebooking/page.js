'use client'
import React, { useState } from 'react'

const MovieBookingSystem = () => {
  const [selectedSeats, setSelectedSeats] = useState([]) // Store selected regular seats
  const [selectedVIPSeats, setSelectedVIPSeats] = useState([]) // Store selected VIP seats
  const [booking, setBooking] = useState(false)
  const totalSeats = 25

  // Function to get the total number of selected seats
  const totalSelectedSeats = selectedSeats.length + selectedVIPSeats.length

  const toggleSeatSelection = (id) => {
    // Prevent adding more seats if the total selection is already 5
    if (booking || (totalSelectedSeats >= 5 && !selectedSeats.includes(id))) return;

    if (selectedSeats.includes(id)) {
      // Remove seat from regular selection
      setSelectedSeats(selectedSeats.filter(seat => seat !== id))
    } else {
      // Add seat to regular selection
      setSelectedSeats([...selectedSeats, id])
    }
  }

  const toggleVIPSeatSelection = (id) => {
    // Prevent adding more seats if the total selection is already 5
    if (booking || (totalSelectedSeats >= 5 && !selectedVIPSeats.includes(id))) return;

    if (selectedVIPSeats.includes(id)) {
      // Remove seat from VIP selection
      setSelectedVIPSeats(selectedVIPSeats.filter(seat => seat !== id))
    } else {
      // Add seat to VIP selection
      setSelectedVIPSeats([...selectedVIPSeats, id])
    }
  }

  const showSeat = () => {
    alert(`Regular Seats: ${selectedSeats.sort()} \nVIP Seats: ${selectedVIPSeats.sort()}`)
  }

  return (
    <div className='px-[40%] mt-10 space-y-2'>
      <h1>Booking System</h1>

      {/* Regular Seats Grid */}
      <p>Regular Seats</p>
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
      <p>VIP Seats</p>
      {/* VIP Seats Grid */}
      <div className='grid h-40 w-40 gap-1 grid-cols-5 grid-rows-5'>
        {Array(totalSeats).fill(0).map((sit, idx) => (
          <div 
            key={idx} 
            onClick={() => toggleVIPSeatSelection(idx)} 
            className={selectedVIPSeats.includes(idx) ? 'bg-green-400' : 'bg-gray-400'}> 
            {sit}
          </div>
        ))}
      </div>

      <h1>Total seat selection limit: 5 (including VIP and regular seats)</h1>
      <h1>Total number of seats selected: {totalSelectedSeats}</h1>
      <button className='bg-cyan-400 rounded-md' onClick={showSeat}>Confirm Selection</button>
    </div>
  )
}

export default MovieBookingSystem
