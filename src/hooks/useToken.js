export const useToken = () => {
  const getToken = () => {
    try {
      const token = localStorage.getItem('token')
      return token ? JSON.parse(token) : null
    } catch (error) {
      return error
    }
  }

  const setToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token))
  }

  const removeToken = () => {
    localStorage.removeItem('token')
  }

  return { getToken, setToken, removeToken }
}
