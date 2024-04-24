// LoginForm.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


interface UserInputs {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}


const LoginPage = () => {
    const [userInputs, setUserInputs] = useState<UserInputs>();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputFieldName = event.target.name
        const inputFieldValue = event.target.value
        setUserInputs({
            ...userInputs,
            [inputFieldName]: inputFieldValue,
        } as UserInputs)
    }

    async function doFetch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(doFetch)


        await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(userInputs)
        })
            .then((response) => response.json())
            .then((data) => data === "Wrong user or password"
                ? console.log("error: Wrong user or password")
                : window.location.assign(data))
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={doFetch}>
                <label
                    style={{
                        margin: "auto",
                        marginBottom: "-20px",
                        width: "70%",
                    }}
                    htmlFor="userName"
                >
                    Email:
                </label>
                <input
                    required
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="userName"
                    style={{
                        margin: "auto",
                        width: "70%",
                    }}
                />
                <label
                    style={{
                        margin: "auto",
                        marginBottom: "-20px",
                        width: "70%",
                    }}
                    htmlFor="password"
                >
                    Password:
                </label>
                <input
                    required
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    style={{
                        margin: "auto",
                        width: "70%",
                    }}
                />
                <button type="submit">Login</button>
                <p>
                    Register <NavLink to="/register">here</NavLink>

                </p>
            </form>
        </div>
    );
};

export default LoginPage;