import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'
// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = ({search}) => {
  const { workouts, dispatch } = useWorkoutsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user) {
      fetchWorkouts()
    }

  }, [dispatch, user])

  const filteredWorkouts = workouts
    ? workouts.filter((workout) => workout.title.toLowerCase().includes(search))
    : [];

  return (
  <div className="home">
      <div className="workouts">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map(workout => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))
        ) : (
          <p>No workouts found</p>
        )}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home