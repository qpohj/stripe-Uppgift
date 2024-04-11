import { useState } from 'react'

const Logout = () => {
    const [user, setUser] = useState<string>("")

    const logout = async () => {
        const response = await fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: "include"
        })

        if (response.status === 200) {
            setUser("")
        }

    }

    return (
        <div>
            <h1>{user ? "INLOGGAD:" + user : "UTLOGGAD"}</h1>
            <button onClick={logout}>Logout</button>
        </div>

    )
}

export default Logout