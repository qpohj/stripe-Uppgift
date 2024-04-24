// RegisterForm.js
import React, { useState } from 'react';


interface UserInputs {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}


const RegisterForm = () => {
    const [userInputs, setUserInputs] = useState<UserInputs>({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    // async function handleLogin() {
    //     await fetch("http://localhost:3000/api/auth/login", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //         body: JSON.stringify(userInputs),
    //     })
    //         .then((response) => response.json())
    //         .then((data) =>
    //             data === "Wrong user or password"
    //                 ? console.log("Something went wrong")
    //                 : window.location.assign(
    //                     "http://localhost:5173/register/success"
    //                 )
    //         );
    // }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userInputs),
            });
            const data = await response.json();
            if (data === 'Success') {
                window.location.assign('http://localhost:5173/login-complete');
            } else {
                console.log('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
                type="email"
                placeholder="Enter your email"
                value={userInputs.email}
                onChange={handleChange}
                name="email"
                required
            />
            <label>Password:</label>
            <input
                type="password"
                placeholder="Enter your password"
                value={userInputs.password}
                onChange={handleChange}
                name="password"
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;