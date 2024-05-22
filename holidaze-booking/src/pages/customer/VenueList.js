import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from '../../components/customer/Filter';
import Search from '../../components/customer/Search';

const VenueList = () => {
    const [venues, setVenues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ wifi: false, parking: false });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVenues = () => {
            const queryParams = new URLSearchParams({
                search: searchTerm,
                wifi: filters.wifi ? 'true' : 'false',
                parking: filters.parking ? 'true' : 'false',
            }).toString();
            const url = `https://v2.api.noroff.dev/holidaze/venues?${queryParams}`;
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setVenues(data.data || []);
                    setLoading(false);
                })
                .catch(error => {
                    setError(`Failed to fetch venues: ${error.message}`);
                    setLoading(false);
                });
        };

        fetchVenues();
    }, [searchTerm, filters]);

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);  // Updates the searchTerm state and triggers a re-fetch
    };

    const handleFilterChange = (filterName, isChecked) => {
        setFilters(prev => ({ ...prev, [filterName]: isChecked }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!venues.length) return <div>No venues found.</div>;

    return (
        <div>
            <h2>Venues</h2>
            <Search onSearch={handleSearch} />
            <Filter filters={filters} onFilterChange={handleFilterChange} />
            {venues.map(venue => (
                <div key={venue.id}>
                    <Link to={`/venues/${venue.id}`}>
                        <h3>{venue.name}</h3>
                        {venue.media && venue.media.length > 0 && (
                            <img src={venue.media[0].url} alt={venue.media[0].alt} style={{ maxWidth: '100%' }} />
                        )}
                        <p>{venue.description}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default VenueList;