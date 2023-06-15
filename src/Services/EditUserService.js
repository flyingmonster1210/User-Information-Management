import ApiService from "./ApiService"

class EditUserService {
  updateUserInfo (newUserInfo) {
    return ApiService.put('http://localhost:4000/update', newUserInfo)
  }
}

export default new EditUserService()