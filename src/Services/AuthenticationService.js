import ApiService from './ApiService.js'

export const USER_NAME_SESSION_NAME = 'authenticatedUser'
export const JWT_TOKEN_SESSION_NAME = 'authenticatedJWT'
export const USER_ID_SESSION_NAME = 'thisUserID'

class AuthenticationServie {
  isUserLoggedIn () {
    let user = localStorage.getItem(USER_NAME_SESSION_NAME)
    if (user === null) { return false }
    else { return true }
  }

  loginForJwt (username, jwt, userID) {
    localStorage.setItem(USER_NAME_SESSION_NAME, username)
    localStorage.setItem(JWT_TOKEN_SESSION_NAME, jwt)
    localStorage.setItem(USER_ID_SESSION_NAME, userID)
  }

  getLoggedUserName () {
    let user = localStorage.getItem(USER_NAME_SESSION_NAME)
    if (user) {
      return user
    }
    else { return '' }
  }

  getJwtToken () {
    let jwt = localStorage.getItem(JWT_TOKEN_SESSION_NAME)
    if (jwt) { return jwt }
    else { return '' }
  }

  getLoggedUserID () {
    let id = localStorage.getItem(USER_ID_SESSION_NAME)
    if (id) return id
    else return ''
  }

  executedAuthentiationService (username, password) {
    // return ApiService.post('/login', { username, password })
    return ApiService.get('http://localhost:4000/login/verify', { username, password })
  }

  logout () {
    localStorage.removeItem(JWT_TOKEN_SESSION_NAME)
    localStorage.removeItem(USER_NAME_SESSION_NAME)
    localStorage.removeItem(USER_ID_SESSION_NAME)
  }

}

export default new AuthenticationServie()