import {useState} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'

function App() {
  const {user} = useAuthContext()
  const [search, setSearch] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setSearch={setSearch}/>
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home search={search}/> : <Navigate to="/login"/>} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/"/>} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/signup"/>} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

