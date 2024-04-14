//#region Imports/Init
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const fs = require('fs').promises;
// const ServerError = require('./classes/ServerError');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripeRouter = require('./routes/stripe.router');
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router')

const app = express();
//#endregion

//#region Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(cookieSession({
    secret: "s3cr3tk3y",
    maxAge: 1000 * 60 * 60 // 1 hour
}));
//#endregion

//#region Routes
// Route for fetching products




// Mount routers
app.use('/auth', authRouter);
app.use('/shop', stripeRouter);
app.use("/users", userRouter)



//#endregion

//#region Error Handling Middleware
// app.use(async (err, req, res, next) => {
//     try {
//         // Dummy code for handling Stripe errors
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: 500,
//             currency: 'sek',
//             payment_method: 'pm_card_visa',
//         });
//         console.log('No error.');
//     } catch (err) {
//         // Handle Stripe errors
//         switch (err.type) {
//             case 'StripeCardError':
//             case 'StripeRateLimitError':
//             case 'StripeInvalidRequestError':
//             case 'StripeAPIError':
//             case 'StripeConnectionError':
//             case 'StripeAuthenticationError':
//             default:
//                 break;
//         }
//     }
//     // Respond with error message
//     res.status(err.statusCode || 500).json(err.message || "Internal Server Error");
// });
//#endregion

//#region Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}...🚀`);
});
//#endregion