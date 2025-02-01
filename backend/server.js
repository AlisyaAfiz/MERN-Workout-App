require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const cors = require('cors');

// express app
const app = express()

app.use(cors({
  origin: ['http://localhost:3000', '//mern-workout-app-2kin.onrender.com/'],
  methods: ['GET', 'POST', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

// middleware
app.use(express.json())

app.get('/', (req, res) => {
  res.send('message');
});

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })