//#region Imports/Init
const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')


const fs = require('fs').promises

const ServerError = require('./classes/ServerError')
require('dotenv').config()

const stripeRouter = require('./routers/stripe.router')
const userRouter = require('./routers/users.router')
const authRouter = require('./routers/auth.router')

const app = express()
//#endregion

//#region MiddleWares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieSession({
    secret: "s3cr3tk3y",
    maxAge: 1000 * 60 * 60,
}))


//#endregion

app.get("/products", async (req, res) => {
    const products = await stripe.products.list({
        expand: ["data.default_price"]
    });
    res.status(200).json(products)
})


//Router
app.use('/stripe/users', userRouter);
app.use('/stripe/auth', authRouter);
app.use('/payments', stripeRouter);



// Error handle middleware
app.use(async (err, req, res, next) => {
    try {
        //dummy code
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 500,
            currency: 'sek',
            payment_method: 'pm_card_visa',
        });
        console.log('No error.');
    } catch (err) {
        switch (err.type) {
            case 'StripeCardError':
                // A declined card error
                err.message; // => e.g. "Your card's expiration year is invalid."
                break;
            case 'StripeRateLimitError':
                // Too many requests made to the API too quickly
                break;
            case 'StripeInvalidRequestError':
                // Invalid parameters were supplied to Stripe's API
                break;
            case 'StripeAPIError':
                // An error occurred internally with Stripe's API
                break;
            case 'StripeConnectionError':
                // Some kind of error occurred during the HTTPS communication
                break;
            case 'StripeAuthenticationError':
                // You probably used an incorrect API key
                break;
            default:
                // Handle any other types of unexpected errors
                break;
        }
    }
    res.status(err.statusCode).json(err.message)
})

//Server
app.listen(3000, () => console.log("Server is up and running at port 3000...🤡"))