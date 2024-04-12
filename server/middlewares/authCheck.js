const authCheck = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json("You are not logged in")
    }
    next()
}

module.exports = { authCheck }