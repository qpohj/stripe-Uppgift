const express = require("express")
const { loggedIn } = require("../middlewares/loggedIn")
const { getUsers } = require("../controllers/user.controller")
const router = express.Router()

router.get("/", loggedIn, getUsers)

module.exports = router