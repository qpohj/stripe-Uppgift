const fs = require("fs").promises
require("dotenv").config
const bcrypt = require("bcrypt")
const fetchUsers = require("../utils/fetchUsers")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const register = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    //Kolla så att användaren inte redan finns
    const users = await fetchUsers()
    const userAlreadyExists = users.find(
        (user) => user.email === email
    )

    if (userAlreadyExists) {
        return res.status(400).json("User already exists")
    }

    const customerData = await stripe.customers.create({
        name: `${firstName} ${lastName}`,
        email: `${email}`
    })

    //Kryptera lösenordet
    const hashedPassword = await bcrypt.hash(password, 10)

    //Sparar till databasen
    const newUser = {
        customerId: customerData.id,
        email,
        firstName,
        lastName,
        password: hashedPassword
    }

    users.push(newUser)
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2))

    //Skicka tillbaka ett svar
    res.status(201).json("http://localhost:5173/register/complete")
}

const login = async (req, res) => {
    const { email, password } = req.body

    const users = await fetchUsers()
    const userExists = users.find(
        (user) => user.email === email
    )

    //Kolla så att lösenordet stämmer och att användaren finns
    if (!userExists || !await bcrypt.compare(password, userExists.password)) {
        return res.status(400).json("Wrong user or password")
    }

    //Skapa en session
    req.session.user = userExists

    //Skicka tillbaka ett svar
    res.status(200).json("http://localhost:5173/")
}

const logout = async (req, res) => {
    req.session = null
    res.status(200).json("Successfully logged out")
}


const authorize = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json("You are not logged in")
    }
    res.status(200).json(req.session.user)
}

module.exports = { register, login, logout, authorize }