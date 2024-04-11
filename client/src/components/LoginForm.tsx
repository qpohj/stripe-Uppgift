// frontend/src/LoginForm.tsx
import React, { useState } from 'react';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setError('');
            // Redirect or update UI after successful login
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <form>
                <h2>Login</h2>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" autoComplete='' value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
