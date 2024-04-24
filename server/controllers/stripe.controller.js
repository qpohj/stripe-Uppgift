const fetchOrders = require("../utils/fetchOrders")
require("dotenv").config
const fs = require("fs").promises
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const createCheckoutSession = async (req, res) => {
    try {
        const { cartItems } = req.body;
        console.log("cartItems:", cartItems);

        const lineItems = cartItems.map((item) => ({
            price: item.product.id,
            quantity: item.quantity,
        }));
        console.log("lineItems:", lineItems);

        const session = await stripe.checkout.sessions.create({
            lineItems: lineItems,
            customer: req.session.user.customerId,
            mode: "payment",
            success_url: "http://localhost:5173/checkout-created",
            cancel_url: "http://localhost:5173/",
        });

        res.status(200).json({ url: session.url, sessionId: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
};

const retrieveCheckoutSession = async (req, res) => {
    try {
        const { orderId } = req.body;
        console.log(orderId);

        const session = await stripe.checkout.sessions.retrieve(orderId);

        if (session.payment_status === "paid") {
            const date = new Date();
            const currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

            const newOrder = {
                orderId: session.id,
                date: currentDate,
                customerId: session.customer,
                products: session.line_items.data.map((item) => ({
                    id: item.id,
                    name: item.description,
                    price: {
                        id: item.price.id,
                        unitAmount: item.price.unit_amount,
                    },
                    quantity: item.quantity,
                })),
                totalPrice: session.amount_total,
            };

            const orders = await fetchOrders();
            orders.push(newOrder);
            await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 2));
            res.status(200).json("Payment success");
        } else {
            res.status(400).json("Payment was declined");
        }
    } catch (error) {
        console.error("Error retrieving checkout session:", error);
        res.status(500).json({ error: "Failed to retrieve checkout session" });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await stripe.products.list({ expand: ["data.default_price"] });
        console.log(products.data);
        res.status(200).json(products.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

const getProductWithId = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await stripe.products.retrieve(id, { expand: ["default_price"] });
        console.log("getProductWithId:", product);

        const productData = {
            id: product.default_price.id,
            product_id: product.id,
            price: product.default_price.unit_amount,
            name: product.name,
            image: product.images,
        };

        res.status(200).json(productData);
    } catch (error) {
        console.error("Error retrieving product:", error);
        res.status(400).json("Product not found");
    }
};

module.exports = { createCheckoutSession, retrieveCheckoutSession, getAllProducts, getProductWithId }