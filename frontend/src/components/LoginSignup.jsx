import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { VITE_SUPA } from '../config.jsx';
import './LoginSignup.css';

function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = '/leaderboard';
    }
  }, [isLoggedIn]);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (isLoggedIn) {
            window.location.href = '/leaderboard';
        }        
    }, [isLoggedIn])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleNewUser() {
        if (formData.username === '' || formData.password === '') {
            setError('Username and password are required');
            return false;
        }
        const url = VITE_SUPA; 
        try {
            // try post
            const hash = await fetch(`https://api.hashify.net/hash/md4/hex?value=${formData.password}`);
            const hashData = await hash.json();
            const hashedPassword = hashData.Digest;
            const newFormData = {
                username: formData.username,
                email: formData.email,
                password: hashedPassword
            }
            const response = await fetch(`${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFormData),
            })
            if (response.status == 409) {
                setError('Username or email already exists');
                return false;
            }
            // console.log(response.status);
            return true;
        }
        catch (error) {
            setError(error.message);
            return false;
        }
    };

    async function handleValidate() {
        try {
            const hash = await fetch(`https://api.hashify.net/hash/md4/hex?value=${formData.password}`);
            const hashData = await hash.json();
            const hashedPassword = hashData.Digest;
            console.log(hashedPassword);

            const res = await fetch(`${VITE_SUPA}&select=email,password&email=eq.${formData.email}`).then(res => res.json());
            // res is a list of users
            if (!res || res.length === 0) {
                setError('User not found');
                return false;
            }
            
            if (res[0].password === hashedPassword) {
                return true;
            }            
            if (error) throw error;
            return false;
        } catch (error) {
            setError(error.message);
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        console.log(formData);
        // testing: create a new user
        if (isLogin) {
            if (await handleValidate()) {
                console.log('user validated');
                setIsLoggedIn(true);
            }
        } else{
            if (await handleNewUser()) {
                console.log('new user created');
                setIsLoggedIn(true);
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                {!isLogin && (
                    <input name="username" type="text" placeholder="Username*" value={formData.username} onChange={handleChange} required />
                )}
                <input name="email" type="email" placeholder="Email*" value={formData.email} onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password*" value={formData.password} onChange={handleChange} required />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </p>
        </div>
    );

}

export default LoginSignup;