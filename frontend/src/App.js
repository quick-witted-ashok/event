import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [events, setEvents] = useState([]);

  // Function to add a new event
  const addEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/events', { title, description, date });
      fetchUpcomingEvents();  // Refresh events after adding
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  // Fetch upcoming events
  const fetchUpcomingEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events/upcoming');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Load upcoming events on component mount
  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  return (
    <div className="App">
      <h1>Event Manager</h1>

      {/* Form to add new events */}
      <form onSubmit={addEvent}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Event</button>
      </form>

      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
