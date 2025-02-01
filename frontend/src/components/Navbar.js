import { Link } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = ({setSearch}) => {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
          {user && (
            <div className="search-container">
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search workouts..."
                onChange={handleSearch}
                className="search-bar"
              />
              <button type="submit" className="search-button">Search</button>
            </form>
          </div>
          )}
          <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar