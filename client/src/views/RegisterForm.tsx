
const Register = async () => {

    const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: "fakeemail@email.com", password: "12345678" })
    })
    const data = await response.json()
    console.log(data)


    return (
        <div>
            {data}
        </div>
    )
}


export default Register