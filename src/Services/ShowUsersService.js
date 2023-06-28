import ApiService from "./ApiService"


class ShowUsersService {
  filterUser (returnType) {
    const result = ApiService.get('http://localhost:4000/filter', { returnType })
    // console.log('result:', result)
    return result
  }

  removeUser (userID) {
    const result = ApiService.delete('http://localhost:4000/delete', { userID })
    // console.log('result: ', result)
    return result
  }
}

export default new ShowUsersService()