const { v4: uuidv4 } = require('uuid')
const express = require('express')
const app = express()
const port = 4000


app.listen(port, () => {
  console.log(`Mock Server is listening on port ${port}`)
})

let allUsers = [
  {
    id: 1,
    username: 'user1',
    password: '123',
    age: 18,
    vip: false
  },
  {
    id: 2,
    username: 'user2',
    password: '123',
    age: 29,
    vip: true
  },
  {
    id: 3,
    username: 'user3',
    password: '123',
    age: 38,
    vip: true
  },
  {
    id: 4,
    username: 'user4',
    password: '123',
    age: 20,
    vip: false
  }
]

app.post('/login/verify', (req, res) => {
  // console.log(req.query)

  res.header('Access-Control-Allow-Origin', '*')

  const { username, password } = req.query
  let response = {
    success: false,
    uuid: null,
    thisUser: null,
  }

  if (username && password) {
    const thisUser = allUsers.filter(item => item.username === username && item.password === password)
    if (thisUser && thisUser.length > 0) {
      response.success = true
      response.uuid = uuidv4()
      response.thisUser = thisUser
    }
  }

  res.send(response)
})

app.post('/filter', (req, res) => {

  const filterFunc = (flag) => {
    let userList = []

    switch (flag) {
      case '-1':
        userList = allUsers
        break
      case '0':
        userList = allUsers.filter(item => item.vip === false)
        break
      case '1':
        userList = allUsers.filter(item => item.vip === true)
        break
      default:
        userList = []
    }

    return userList
  }

  res.header('Access-Control-Allow-Origin', '*')

  /*
    returnType: 
      '-1' return all users,
       '0' return normal users,
       '1' return VIP
  */
  // console.log(req.query)
  const { returnType } = req.query
  let response = {
    success: false,
    userList: null,
  }

  if (returnType) {
    let userList = filterFunc(returnType)
    console.log('userList', userList)

    if (userList && userList.length > 0) {
      response.success = true
      response.userList = userList
    }
  }

  res.send(response)
})








