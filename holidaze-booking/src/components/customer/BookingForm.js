import React, { useState } from 'react';

const BookingForm = ({ venueId }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');

    const handleBooking = async (e) => {
        e.preventDefault();
        const bookingDetails = {
            venueId,
            startDate,
            endDate
        };

        try {
            const response = await fetch('https://api.noroff.dev/v2/holidaze/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingDetails)
            });
            const data = await response.json();
            setBookingStatus('Booking successful!');
            console.log(data); // For debug
        } catch (error) {
            setBookingStatus('Failed to book venue.');
            console.error('Error booking venue:', error);
        }
    };

    return (
        <form onSubmit={handleBooking}>
            <label>
                Start Date:
                <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                />
            </label>
            <label>
                End Date:
                <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                />
            </label>
            <button type="submit">Book Now</button>
            <p>{bookingStatus}</p>
        </form>
    );
}

export default BookingForm;
