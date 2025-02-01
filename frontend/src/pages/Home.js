import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'
// components
import WorkoutDetails from "../components/WorkoutDetails"

const Home = ({search}) => {
  const { workouts, dispatch } = useWorkoutsContext()
  const {user} = useAuthContext()
  const [sort, setSort] = useState('recent');

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

    const sortedWorkouts = filteredWorkouts.sort((a, b) => {
      if (sort === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sort === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt); 
      } else if (sort === "title") {
        return a.title.localeCompare(b.title);
      } else if (sort === "reverse-title") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

  return (
  <div className="home">
      <div className="workouts">
        {sortedWorkouts.length > 0 ? (
          sortedWorkouts.map(workout => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))
        ) : (
          <p>No workouts found</p>
        )}
      </div>
      <div className="sort-container">
        <label htmlFor="sortBy">Sort by:</label>
        <select
          id="sortBy"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest</option>
          <option value="title">A to Z</option>
          <option value="reverse-title">Z to A</option>
        </select>
      </div>
    </div>
  )
}

export default Home