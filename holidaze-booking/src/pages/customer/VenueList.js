import React, { useState, useEffect } from 'react';

const VenueList = () => {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        fetch('https://api.noroff.dev/v2/holidaze/venues')
            .then(response => response.json())
            .then(data => setVenues(data))
            .catch(error => console.error('Error fetching venues:', error));
    }, []);

    return (
        <div>
            <h2>Our Venues</h2>
            <div>
                {venues.map(venue => (
                    <div key={venue.id}>
                        <h3>{venue.name}</h3>
                        <p>{venue.description}</p>
                        {/* Implement link to VenueDetails page */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VenueList;
