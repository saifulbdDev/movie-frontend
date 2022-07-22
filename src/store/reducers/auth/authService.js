import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth'

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData)



  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData)

  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data.token))
  }

  return response.data.token
}

// Logout user
const logOut = () => {
  localStorage.removeItem('token')
}

const authService = {
  register,
  logOut,
  login,
}

export default authService
