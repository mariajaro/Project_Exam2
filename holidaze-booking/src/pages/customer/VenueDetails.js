import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const VenueDetails = () => {
    const { venueId } = useParams();
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);

    useEffect(() => {
        const fetchVenueDetails = async () => {
            const url = `https://v2.api.noroff.dev/holidaze/venues/${venueId}`;
            console.log("Fetching URL:", url);

            try {
                const response = await fetch(url);
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Data:', data);
                setVenue(data); // Directly set the object response
                setAvailableDates(data.availableDates || []); // Assuming availableDates is a property in your response
                setLoading(false);
            } catch (error) {
                console.error('Error fetching venue details:', error);
                setError(`Failed to fetch venue: ${error.message}`);
                setLoading(false);
            }
        };

        fetchVenueDetails();
    }, [venueId]);

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = date.toISOString().split('T')[0];
            return !availableDates.includes(formattedDate);
        }
        return false;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!venue) return <div>No venue found.</div>;

    return (
        <div>
            <h2>{venue.name}</h2>
            {venue.media && venue.media.length > 0 && (
                <div>
                    {venue.media.map((mediaItem, index) => (
                        <img
                            key={index}
                            src={mediaItem}
                            alt={'Venue image'}
                            style={{ maxWidth: '100%', marginBottom: '10px' }}
                        />
                    ))}
                </div>
            )}
            <p>{venue.description}</p>
            <p>Price: ${venue.price}</p>
            <p>Max Guests: {venue.maxGuests}</p>
            <p>Rating: {venue.rating}</p>
            {venue.meta && (
                <div>
                    <h3>Amenities</h3>
                    <ul>
                        <li>Wifi: {venue.meta.wifi ? 'Yes' : 'No'}</li>
                        <li>Parking: {venue.meta.parking ? 'Yes' : 'No'}</li>
                        <li>Breakfast: {venue.meta.breakfast ? 'Yes' : 'No'}</li>
                        <li>Pets: {venue.meta.pets ? 'Yes' : 'No'}</li>
                    </ul>
                </div>
            )}
            {venue.location && (
                <div>
                    <h3>Location</h3>
                    <p>{venue.location.address}, {venue.location.city}, {venue.location.zip}, {venue.location.country}</p>
                    <p>Continent: {venue.location.continent}</p>
                    <p>Latitude: {venue.location.lat}</p>
                    <p>Longitude: {venue.location.lng}</p>
                </div>
            )}
            <div>
                <h3>Available Dates</h3>
                <Calendar
                    tileDisabled={tileDisabled}
                />
            </div>
        </div>
    );
};

export default VenueDetails;
