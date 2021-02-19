export const API_ROUTE = getApiServer()

export const USER_LOGIN = `${API_ROUTE}login/`
export const USER_REGISTER = `${API_ROUTE}register/`

export const BASKET = `${API_ROUTE}basket/`
export const BASKET_PRODUCT = id => `${API_ROUTE}basket/${id}`

export const COURSES = `${API_ROUTE}courses/`

function getApiServer() {
  if (process.env.NODE_ENV === "development") {
    return "https://evening-cove-72015.herokuapp.com/api/"
    // return process.env.GATSBY_API_URL
  }
  if (process.env.NODE_ENV === "production") {
    return process.env.GATSBY_API_URL
  }
  return "https://evening-cove-72015.herokuapp.com/api/"
}
