// @desc Register 
// @route POST /api/users
// @access Public
const registerUser = (req, res) => {
  res.json({ message: "Register User"})
}

// @desc Authenticate a user 
// @route POST /api/users/login
// @access Public
const loginUser = (req, res) => {
  res.json({ message: "Login User"})
}

// @desc Get user data 
// @route GET /api/users/me
// @access Public
const getCurrentUser = (req, res) => {
  res.json({ message: "Get current user data"})
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
