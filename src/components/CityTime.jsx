import React, { useEffect, useState } from 'react';

const CityTime = ({ city }) => {
  const [timeInfo, setTimeInfo] = useState(null);
  const [localTimeInfo, setLocalTimeInfo] = useState(null);
  const [error, setError] = useState(null);

  // 🟢 Format ISO string directly without altering its timezone
  const formatRawTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  useEffect(() => {
    if (!city?.lat || !city?.lng) return;

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

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offsetMinutes = new Date().getTimezoneOffset();
    const userUtcOffset = -offsetMinutes / 60;

    setLocalTimeInfo({
      timeZone: userTimeZone,
      utcOffset: userUtcOffset,
    });
  }, []);

  if (!city) return null;

  const targetUtcOffset =
    timeInfo?.currentUtcOffset?.seconds != null
      ? timeInfo.currentUtcOffset.seconds / 3600
      : null;

  const getTimeDifferenceLabel = () => {
    if (!timeInfo?.currentLocalTime || !localTimeInfo?.timeZone) return '';

    const cityTime = new Date(timeInfo.currentLocalTime).getTime();
    const localTime = new Date().toLocaleString('en-US', {
      timeZone: localTimeInfo.timeZone,
    });
    const localTimeMs = new Date(localTime).getTime();

    return cityTime > localTimeMs ? 'ahead' : 'behind';
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow text-black text-center">
      <h2 className="text-xl font-semibold mb-2">
        Local Time in {city.city}, {city.country}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      {timeInfo ? (
        <div>
          <p className="text-2xl text-green-500 font-semibold">
            {formatRawTime(timeInfo.currentLocalTime)}
          </p>

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
            {Math.abs(localTimeInfo.utcOffset - targetUtcOffset) === 0 ? (
              <p className="mt-1">
                You and <strong>{city.city}</strong> are in the <strong>same timezone</strong>.
              </p>
            ) : (
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
            )}
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
