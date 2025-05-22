import React, { useEffect, useState } from 'react';
import CityTime from '../components/CityTime'; // ✅ Make sure the path is correct

const CitySearch = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null); // ✅ Track selected city

  // Load city list from public
  useEffect(() => {
    fetch('/cities.json')
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        console.log('Loaded city data:', data.length);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setFilteredCities([]);
      setSelectedCity(null);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = cities.filter(
      (entry) =>
        entry.city?.toLowerCase().includes(term) ||
        entry.country?.toLowerCase().includes(term)
    );

    setFilteredCities(results.slice(0, 10));
    console.log('Filtered results:', results);
  }, [searchTerm, cities]);

  const handleCityClick = (entry) => {
    setSearchTerm(`${entry.city}, ${entry.country}`);
    setFilteredCities([]);
    setSelectedCity(entry); // ✅ Set selected city
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <label htmlFor="city-input" className="block mb-2 text-2xl font-semibold">
      World Time Checker
      </label>
      <p  className="text-lg font-semibold mb-10">Select a city or country you are insterested in:</p>
      <input
        id="city-input"
        type="text"
        placeholder="Start typing a city or country..."
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCities.length > 0 && (
        <ul className="mt-2 border border-gray-200 rounded-lg text-black bg-white shadow-lg max-h-60 overflow-y-auto">
          {filteredCities.map((entry) => (
            <li
              key={entry.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleCityClick(entry)}
            >
              {entry.city}, {entry.country}
            </li>
          ))}
        </ul>
      )}

      {/* ✅ Show time info when a city is selected */}
      {selectedCity && <CityTime city={selectedCity} />}
    </div>
  );
};

export default CitySearch;
