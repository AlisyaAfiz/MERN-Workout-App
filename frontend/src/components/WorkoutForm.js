import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [weight, setWeight] = useState('')
  const [intensity, setIntensity] = useState('')
  const [duration, setDuration] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return 
    }

    const workout = {title, weight, intensity, duration}
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts`, {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setWeight('')
      setIntensity('')
      setDuration('')
      dispatch({type: 'CREATE_WORKOUT', payload: json})
      navigate('/')
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 

      <label>Name of Exercise:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Your current weight: (kg)</label>
      <input 
        type="number" 
        onChange={(e) => setWeight(e.target.value)} 
        value={weight}
        className={emptyFields.includes('weight') ? 'error' : ''}
      />

      <label>MET: (Intensity of your activity)</label>
      <select 
        onChange={(e) => setIntensity(e.target.value)} 
        value={intensity} 
        className={emptyFields.includes('intensity') ? 'error' : ''}
      >
        <option value="" disabled>Select the intensity level</option>
        <option value="3">Light (e.g., walking)</option>
        <option value="5">Moderate (e.g., brisk walking, light cycling)</option>
        <option value="8">Vigorous (e.g., running, swimming)</option>
      </select>

      <label>Duration: (in hours)</label>
      <input 
        type="number" 
        onChange={(e) => setDuration(e.target.value)} 
        value={duration}
        className={emptyFields.includes('duration') ? 'error' : ''}
      />

      <button className="addworkout-button">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm