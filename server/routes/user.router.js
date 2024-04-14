const express = require("express")
const { authCheck } = require("../middlewares/authCheck")
const { getUsers } = require("../controllers/user.controller")
const router = express.Router()

router.get("/", authCheck, getUsers)

module.exports = router