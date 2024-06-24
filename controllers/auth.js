const  register = (req, res) => {
   res.send("User registered")
}

const login = (req, res) => {
    res.send("User login")
}

module.exports = {
    register,
    login
}