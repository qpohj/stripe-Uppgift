const fs = require("fs").promises

const fetchOrders = async () => {

    try {
        const data = await fs.readFile("./data/orders.json", 'utf8');
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Extract the "orders" array from the parsed JSON object
        const orders = jsonData.orders;
        console.log("Raw data", orders)

        if (!Array.isArray(orders)) {
            throw new Error('Data is not an array');
        }
        console.log("fetchingOrders:",orders)
        return orders;
    } catch (error) {
        console.error("Error reading file", error)
        return []
    }

}

module.exports = fetchOrders