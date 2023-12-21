'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function App() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.github.com/users/bellobambo/repos');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterEventsByDateTime = () => {
    return events.filter((event) => {
      const eventDateTime = new Date(event.created_at);
      const startDateWithoutTime = new Date(startDate);
      const endDateWithoutTime = new Date(endDate);

      // Set hours, minutes, seconds, and milliseconds for precise comparison
      startDateWithoutTime.setHours(0, 0, 0, 0);
      endDateWithoutTime.setHours(23, 59, 59, 999);

      return (
        (!startDate || eventDateTime >= startDateWithoutTime) &&
        (!endDate || eventDateTime <= endDateWithoutTime)
      );
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { hour: 'numeric', minute: 'numeric' });
    // Use 'en-US' for MM/dd/yyyy format with time
  };

  return (
    <div className="border border-zinc-700">
      <DatePicker
        selectsStart
        isClearable
        dateFormat="dd/MM/yyyy HH:mm"
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          // Uncomment the line below to also set the end date when the start date changes
          // setEndDate(date);
        }}
        startDate={startDate}
        endDate={endDate}
        selectsEnd={endDate ? true : undefined}
        minDate={startDate}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
      />
      <DatePicker
        selectsEnd
        isClearable
        dateFormat="dd/MM/yyyy HH:mm"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
      />

      <div>
        <h2>Filtered Repositories</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {filterEventsByDateTime().map((repo) => (
              <tr key={repo.id}>
                <td>{repo.name}</td>
                <td>{formatDate(new Date(repo.created_at))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}