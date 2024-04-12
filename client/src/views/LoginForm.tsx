// frontend/src/LoginForm.tsx
import React, { useState } from 'react';

const LoginForm = () => {

    const handleLogin = async () => {
        
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error("We got an error");
            }

            // Redirect or update UI after successful login
        } catch (error) {
            //sadasdsa
        }
    };


    return (
        <div>
            <form>
                <h2>Login</h2>
                <button onClick={handleLogin}>Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    )
}

export default LoginForm;
