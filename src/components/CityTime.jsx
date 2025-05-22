// src/components/CityTime.jsx
import React, { useEffect, useState } from 'react';

const CityTime = ({ city }) => {
  const [timeInfo, setTimeInfo] = useState(null);
  const [localTimeInfo, setLocalTimeInfo] = useState(null);
  const [error, setError] = useState(null);

  const formatLocalTime = (isoString, timeZone) => {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone,
      hour12: false
    });

    return formatter.format(date);
  };

  // Fetch selected city time info
  useEffect(() => {
    if (!city || !city.lat || !city.lng) return;

    const fetchTime = async () => {
      try {
        const response = await fetch(
          `https://timeapi.io/api/TimeZone/coordinate?latitude=${city.lat}&longitude=${city.lng}`
        );
        const data = await response.json();
        console.log('TimeAPI response:', data);

        if (data.currentLocalTime) {
          setTimeInfo(data);
          setError(null);
        } else {
          setError('Time data not found');
        }
      } catch (err) {
        console.error('TimeAPI error:', err);
        setError('Failed to fetch time data');
      }
    };

    fetchTime();
  }, [city]);

  // Get user's local timezone and UTC offset
  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offsetMinutes = new Date().getTimezoneOffset(); // in minutes
    const userUtcOffset = -offsetMinutes / 60; // convert to hours

    setLocalTimeInfo({
      timeZone: userTimeZone,
      utcOffset: userUtcOffset
    });
  }, []);

  if (!city) return null;

  // ✅ Safely extract city UTC offset in hours
  const targetUtcOffset =
    timeInfo?.currentUtcOffset?.seconds != null
      ? timeInfo.currentUtcOffset.seconds / 3600
      : null;

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow text-black text-center">
      <h2 className="text-xl font-semibold mb-2">
        Local Time in {city.city}, {city.country}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      {timeInfo ? (
        <div>
          <p className="text-2xl text-green-500 font-semibold">
            {formatLocalTime(timeInfo.currentLocalTime, timeInfo.timeZone)}
          </p>

          {/* Time zone comparison */}
          {localTimeInfo && targetUtcOffset != null && (
            <div className="mt-4 text-gray-700">
              <p>
                You are in <strong>{localTimeInfo.timeZone}</strong> (UTC
                {localTimeInfo.utcOffset >= 0 ? '+' : ''}
                {localTimeInfo.utcOffset})
              </p>
              <p>
                While <strong>{city.city}</strong> is in{' '}
                <strong>{timeInfo.timeZone}</strong> (UTC
                {targetUtcOffset >= 0 ? '+' : ''}
                {targetUtcOffset})
              </p>
       <p className="mt-1">
        That’s a time difference of{' '}
            <strong>
                {Math.abs(localTimeInfo.utcOffset - targetUtcOffset)} hour
                {Math.abs(localTimeInfo.utcOffset - targetUtcOffset) !== 1 ? 's' : ''}
            </strong>{' '}
            — {city.city} is{' '}
            <strong>
                {targetUtcOffset > localTimeInfo.utcOffset ? 'ahead' : 'behind'}
            </strong>{' '}
            your local time.
        </p>

            </div>
          )}
        </div>
      ) : (
        !error && <p>Loading time...</p>
      )}
    </div>
  );
};

export default CityTime;
