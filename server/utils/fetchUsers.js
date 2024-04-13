const fs = require("fs").promises

const fetchUsers = async () => {

    try {
        const data = await fs.readFile("./data/users.json", 'utf8');
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Extract the "users" array from the parsed JSON object
        const users = jsonData.users;
        console.log("Raw data", users)

        if (!Array.isArray(users)) {
            throw new Error('Data is not an array');
        }
        return users;
    } catch (error) {
        console.error("Error reading file", error)
        return []
    }

}

module.exports = fetchUsers