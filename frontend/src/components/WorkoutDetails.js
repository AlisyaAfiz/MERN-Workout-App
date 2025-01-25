import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  const calculateCalories = () => {
    const { weight, intensity, duration } = workout; 
    return (intensity * weight * duration).toFixed(2);
  };

  const handleClick = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts${workout._id}`, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Weight:{' '}</strong>{workout.weight}</p>
      <p><strong>MET (Intensity of your exercise):{' '}</strong>{workout.intensity}</p>
      <p><strong>Duration (in hours):{' '}</strong>{workout.duration}</p>
      <p><strong>Calories Burned:{' '}</strong>{calculateCalories()} kcal</p>
      <br></br>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails