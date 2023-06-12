import ApiService from "./ApiService"


class ShowUsersService {
  filterUser (returnType) {
    const result = ApiService.post('http://localhost:4000/filter', { returnType })
    // console.log('result:', result)
    return result
  }
}

export default new ShowUsersService()