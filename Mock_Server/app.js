const { v4: uuidv4 } = require('uuid')
const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
const bodyParser = require('body-parser').json()
const fs = require('fs')

const path = require('path')
const multer = require('multer')
const upload = multer({
  storage: multer.diskStorage({
    destination (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename (req, file, cb) {
      const extname = path.extname(file.originalname)
      cb(null, Date.now() + extname)
    }
  })
})

app.listen(port, () => {
  console.log(`Mock Server is listening on port ${port}`)
})

let allUsers = [
  {
    id: '-1',
    username: 'test',
    password: '123',
    age: '18',
    vip: false,
    avatar: null,
    intro: 'testing msg'
  },
  {
    id: '0',
    username: 'new user',
    password: 'password',
    age: '20',
    vip: false,
    avatar: null,
    intro: 'Please give a brief introduction.'
  },
  {
    id: '111',
    username: 'user1',
    password: '123',
    age: '18',
    vip: false,
    avatar: 'public\\uploads\\111.png',
    intro: 'John is a passionate entrepreneur who has successfully launched several tech startups, with expertise in software development and product management.'
  },
  {
    id: '112',
    username: 'user2',
    password: '123',
    age: '29',
    vip: true,
    avatar: 'public\\uploads\\112.png',
    intro: 'Sarah is a dedicated educator with a strong background in mathematics, inspiring students to explore the world of numbers and problem-solving.'
  },
  {
    id: '113',
    username: 'user3',
    password: '123',
    age: '38',
    vip: true,
    avatar: 'public\\uploads\\113.png',
    intro: 'Lisa is a talented artist specializing in oil paintings, known for her vibrant use of color and capturing the essence of landscapes and nature.'
  },
  {
    id: '114',
    username: 'user4',
    password: '123',
    age: '20',
    vip: false,
    avatar: 'public\\uploads\\114.png',
    intro: 'Mark is a seasoned financial analyst with a deep understanding of market trends, providing strategic advice to clients and helping them make informed investment decisions.'
  }
]

app.use((req, res, next) => {
  console.log(new Date())
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.options('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'POST', 'DELETE', 'PUT')
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Content-Type')
  next()
})

app.get('/login/verify', (req, res) => {
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

app.get('/filter', (req, res) => {

  const filterFunc = (flag) => {
    let userList = []
    /*
      returnType: 
        '-1' return all users,
         '0' return normal users,
         '1' return VIP
    */
    // console.log(req.query)

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
  // console.log(new Date())
  // console.log(response)
  res.send(response)
})

app.get('/editUser', (req, res) => {

  const { userID } = req.query
  let response = {
    success: false,
    thisUser: null,
  }

  if (userID) {
    const thisUser = allUsers.filter(item => item.id === userID)
    if (thisUser.length > 0) {
      response.success = true
      response.thisUser = thisUser
    }
  }

  res.send(response)
})

app.put('/update', bodyParser, (req, res) => {

  let response = {
    success: false,
    thisUser: null,
  }

  const body = req.body
  if (body) {
    const index = allUsers.findIndex(item => item.id === body.id)
    console.log('update->index:', index)
    console.log(body)
    if (index >= 0) {
      allUsers[index] = body
      response.success = true
      response.thisUser = allUsers[index]
    }
  }

  // console.log('req.body:', req.body)

  res.send(response)
})

app.post('/add', bodyParser, (req, res) => {
  const response = {
    success: false,
    thisNewUser: null,
  }

  const body = req.body
  console.log('add->body:', body)
  if (body && Object.keys(body).length > 0) {
    response.thisNewUser = {
      id: uuidv4(),
      username: body.username,
      password: body.password,
      age: body.age,
      vip: body.vip,
      avator: body.avator ? body.avator : null,
      intro: body.intro,
    }
  }
  allUsers.push(response.thisNewUser)
  console.log(allUsers)

  res.send(response)
})


app.delete('/delete', (req, res) => {
  const response = {
    success: false,
    newUserList: null
  }

  const { userID } = req.query
  if (userID) {
    const newUserList = allUsers.filter(item => item.id !== userID)
    response.newUserList = newUserList

    const previousLength = allUsers.length
    const newLength = newUserList.length
    if (newLength < previousLength) {
      response.success = true
      allUsers = newUserList
    }
    // console.log(allUsers)
  }

  res.send(response)
})

// https://anandzhang.com/posts/frontend/14
// https://anandzhang.com/posts/frontend/15


app.post('/upload', upload.single('file'), (req, res) => {
  const { file: { filename, path } } = req
  console.log('path in upload:: ', path)
  res.send({
    success: true,
    picInfo: {
      name: filename,
      url: path
    }
  })
})

app.delete('/deleteImg', bodyParser, (req, res) => {
  const response = {
    success: false,
    message: 'default message...'
  }
  const body = req.body
  if (body && Object.keys(body).length > 0) {
    const { path } = body
    fs.unlink(path, (error) => {
      console.log('path in deleteImg: ', path)
      if (error) {
        response.message = error
        res.send(response)
      }
      else {
        response.success = true
        response.message = 'image has been deleted'
        res.send(response)
      }
    })
  }
})

app.get('/getAvatar', (req, res) => {
  var { path } = req.query
  if (path) {
    path = __dirname + '\\' + path
    // console.log('path: ', path)
    if (fs.existsSync(path)) {
      res.sendFile(path)
    }
    else {
      res.sendFile(__dirname + '\\' + 'public\\uploads\\default.png')
    }
  }
})





