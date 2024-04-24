const express = require("express")
const {
    createCheckoutSession,
    getAllProducts,
    getProductWithId,
    retrieveCheckoutSession
} = require("../controllers/stripe.controller")


const router = express.Router()

router.get("/get-all-products", getAllProducts)
router.post("/get-product-with-id", getProductWithId)
router.post("/create-checkout-session", createCheckoutSession)
router.post("/retrieve-checkout-session", retrieveCheckoutSession)


module.exports = router