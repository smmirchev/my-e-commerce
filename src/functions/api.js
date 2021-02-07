export const API_ROUTE = getApiServer()

export const USER_LOGIN = `${API_ROUTE}login/`
export const USER_REGISTER = `${API_ROUTE}register/`

export const BASKET = `${API_ROUTE}basket/`

export const COURSES = `${API_ROUTE}courses/`

function getApiServer() {
  if (process.env.NODE_ENV === "development") {
    return process.env.API_URL
  }
  if (process.env.NODE_ENV === "production") {
    return process.env.API_URL
  }
  return process.env.API_URL || "netlify_URL_here"
}
