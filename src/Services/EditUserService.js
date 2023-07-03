import ApiService from "./ApiService"

class EditUserService {
  updateUserInfo (newUserInfo) {
    return ApiService.put('http://localhost:4000/update', newUserInfo)
  }

  addNewUserInfo (newUserInfo) {
    return ApiService.post('http://localhost:4000/add', newUserInfo)
  }

  getUserInfo (userID) {
    return ApiService.get('http://localhost:4000/editUser', { userID })
  }

  deleteImage (path) {
    return ApiService.deleteWithBody('http://localhost:4000/deleteImg', { path })
  }
}

export default new EditUserService()