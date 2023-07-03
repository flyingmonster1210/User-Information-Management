import ApiService from "./ApiService"

class EditUserService {
  updateUserInfo (newUserInfo) {
    return ApiService.put('http://localhost:4000/update', newUserInfo)
  }

  getUserInfo (userID) {
    return ApiService.get('http://localhost:4000/editUser', { userID })
  }

  deleteImage (path) {
    return ApiService.delete('http://localhost4000/deleteImg', path)
  }
}

export default new EditUserService()