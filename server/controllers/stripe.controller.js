const initStripe = require("../stripe")
const fs = require("fs").promises

const createCheckoutSession = async (req, res) => {

    const { cart } = req.body

    const stripe = initStripe()

    console.log(cart)

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer: "cus_PuCgTnHruCYmq3",
        line_items: cart.map(item => {
            return {
                price: item.price,
                quantity: item.quantity
            }
        }),
        success_url: "http://localhost:5173/stripe/verify-session",
        cancel_url: "http://localhost:5173",
    })

    res.status(200).json({ url: session.url, sessionId: session.id })
}

const verifySession = async (req, res) => {
    const stripe = initStripe()

    console.log("Nu kommer jag hit")
    const sessionId = req.body.sessionId
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === "paid") {
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)

        const order = {
            orderNumber: Math.floor(Math.random() * 100000000),
            customerName: session.customer_details.name,
            products: lineItems.data,
            total: session.amount_total,
            date: new Date()
        }

        const orders = JSON.parse(await fs.readFile("./data/orders.json"))
        orders.push(order)
        await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 4))

        res.status(200).json({ verified: true })
    }

}

const getProducts = async (req, res) => {
    const stripe = initStripe()
    try {
        // Fetch products from Stripe API
        const products = await stripe.products.list({
            expand: ["data.default_price"]
        });
        res.status(200).json(products);
    } catch (error) {
        // Handle errors
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
}

module.exports = { createCheckoutSession, verifySession, getProducts }