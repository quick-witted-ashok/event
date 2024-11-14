const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://manikinediashok:oIRHHXxsSZz9HZNe@cluster0.xau5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});





  // Define Event Schema
  const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
  });
  
  const Event = mongoose.model('Event', eventSchema);
  
  // Route to add a new event
  app.post('/events', async (req, res) => {
    const { title, description, date } = req.body;
    const newEvent = new Event({ title, description, date });
  
    try {
      await newEvent.save();
      res.status(201).json({ message: 'Event added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add event' });
    }
  });
  
  // Route to get upcoming events
  app.get('/events/upcoming', async (req, res) => {
    try {
      const today = new Date();
      const upcomingEvents = await Event.find({ date: { $gte: today } }).sort({ date: 1 });
      res.json(upcomingEvents);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve events' });
    }
  });
    

  app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });