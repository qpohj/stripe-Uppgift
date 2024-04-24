const fs = require("fs").promises

const fetchUsers = async () => {
    const data = await fs.readFile("./data/users.json", 'utf8');
    // Parse the JSON data
    const users = JSON.parse(data);
    console.log("Raw data", users)

    if (!users || users.length <= 0) {
        return []
    }
    console.log("fetchingUsers:",users)
    return users;

}

module.exports = fetchUsers