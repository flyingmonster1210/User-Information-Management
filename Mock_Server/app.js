const { v4: uuidv4 } = require('uuid')
const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser').json()


app.listen(port, () => {
  console.log(`Mock Server is listening on port ${port}`)
})

let allUsers = [
  {
    id: 1,
    username: 'user1',
    password: '123',
    age: '18',
    vip: false,
    avatar: null,
    intro: 'John is a passionate entrepreneur who has successfully launched several tech startups, with expertise in software development and product management.'
  },
  {
    id: 2,
    username: 'user2',
    password: '123',
    age: '29',
    vip: true,
    avatar: null,
    intro: 'Sarah is a dedicated educator with a strong background in mathematics, inspiring students to explore the world of numbers and problem-solving.'
  },
  {
    id: 3,
    username: 'user3',
    password: '123',
    age: '38',
    vip: true,
    avatar: null,
    intro: 'Lisa is a talented artist specializing in oil paintings, known for her vibrant use of color and capturing the essence of landscapes and nature.'
  },
  {
    id: 4,
    username: 'user4',
    password: '123',
    age: '20',
    vip: false,
    avatar: null,
    intro: 'Mark is a seasoned financial analyst with a deep understanding of market trends, providing strategic advice to clients and helping them make informed investment decisions.'
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

    if (userList && userList.length > 0) {
      response.success = true
      response.userList = userList
    }
  }
  console.log(new Date())
  console.log(response)
  res.send(response)
})

app.put('/update', bodyParser, (req, res) => {

  res.header('Access-Control-Allow-Origin', '*')

  let response = {
    success: false,
    thisUser: null,
  }

  const body = req.body
  if (body) {
    const index = allUsers.findIndex(item => item.id === body.id)
    console.log('index:', index)
    if (index >= 0) {
      allUsers[index] = body
      response.success = true
      response.thisUser = allUsers[index]
    }
  }

  console.log('req.body:', req.body)

  res.send(response)
})






