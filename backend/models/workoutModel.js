const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  intensity: { 
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
}, { timestamps: true })


module.exports = mongoose.model('Workout', workoutSchema)