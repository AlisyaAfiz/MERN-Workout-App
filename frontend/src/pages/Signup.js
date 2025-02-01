import {useState} from 'react'
import {useSignup} from '../hooks/useSignup'
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = await signup(email, password);
        if (result) {
            history.push('/'); 
        }
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3 style={{fontSize: '20px', paddingBottom: '20px'}}>Sign Up</h3>

            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button className="login-signup" disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup