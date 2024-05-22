import React from 'react';

const Filter = ({ onFilterChange, filters }) => {
    return (
        <div>
            <label>
                Wifi
                <input
                    type="checkbox"
                    checked={filters.wifi}
                    onChange={(e) => onFilterChange('wifi', e.target.checked)}
                />
            </label>
            <label>
                Parking
                <input
                    type="checkbox"
                    checked={filters.parking}
                    onChange={(e) => onFilterChange('parking', e.target.checked)}
                />
            </label>
            {/* Add more filters as needed */}
        </div>
    );
};

export default Filter;