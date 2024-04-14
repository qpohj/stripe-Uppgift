const express = require("express")
const { createCheckoutSession, verifySession, getProducts } = require("../controllers/stripe.controller")
const router = express.Router()

router.post("/create-checkout-session", createCheckoutSession)
router.post("/verify-session", verifySession)
router.get("/products", getProducts)



module.exports = router