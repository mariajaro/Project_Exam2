import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VenueDetails = () => {
    const [venue, setVenue] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://api.noroff.dev/v2/holidaze/venues/${id}`)
            .then(response => response.json())
            .then(data => setVenue(data))
            .catch(error => console.error('Error fetching venue details:', error));
    }, [id]);

    if (!venue) return <div>Loading...</div>;

    return (
        <div>
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
            {/* More details */}
        </div>
    );
}

export default VenueDetails;
