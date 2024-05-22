import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const VenueDetails = () => {
    const { venueId } = useParams();
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(new Date()); // Default start date as today
    const [availableDates, setAvailableDates] = useState([]); // State to store available dates

    useEffect(() => {
        const fetchVenueDetails = async () => {
            const url = `https://v2.api.noroff.dev/holidaze/venues/${venueId}`;
            console.log("Fetching URL:", url);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setVenue(data.data); // Ensure you are using correct path to access the venue data
                setAvailableDates(data.data.availableDates || []); // Assuming available dates comes with venue details
                setLoading(false);
            } catch (error) {
                console.error('Error fetching venue details:', error);
                setError(`Failed to fetch venue: ${error.message}`);
                setLoading(false);
            }
        };

        fetchVenueDetails();
    }, [venueId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!venue) return <div>No venue found.</div>;

    return (
        <div>
            <h2>{venue.name}</h2>
            {venue.media && venue.media.map((media, index) => (
                <img key={index} src={media.url} alt={media.alt || "Venue"} style={{ maxWidth: "100%" }} />
            ))}
            <p>{venue.description}</p>
            <p>Price: ${venue.price}</p>
            <p>Max Guests: {venue.maxGuests}</p>
            <p>Rating: {venue.rating}</p>
            {/* Here you integrate the DatePicker */}
            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                includeDates={availableDates.map(date => new Date(date))}
                inline
            />
            {/* Details about venue location and amenities */}
        </div>
    );
};

export default VenueDetails;