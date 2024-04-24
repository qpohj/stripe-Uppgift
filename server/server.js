//#region Imports/Init
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
require('dotenv').config();



const stripeRouter = require('./routes/stripe.router');
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router')

const app = express();
//#endregion

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(
    cookieSession({
        secret: "s3cr3tk3y",
        maxAge: 1000 * 60 * 60 // 1 hour
}));


// Mount routers
app.use("/api/users", userRouter)
app.use('/api/auth', authRouter);
app.use('/api/stripe', stripeRouter);


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

//Server Start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}...🚀`);
});