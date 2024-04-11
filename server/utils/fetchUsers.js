// backend/fetchUsers.js
const fs = require("fs").promises;

const fetchUsers = async () => {
    const data = await fs.readFile("./data/users.json");
    const users = JSON.parse(data.toString());
    return users;
};

module.exports = fetchUsers;