const { v4: uuidv4 } = require('uuid')
const express = require('express')
const app = express()
const port = 3000


app.listen(port, () => {
  console.log(`Mock Server is listening on port ${port}`)
})

let user = [
  {
    id: 1,
    username: 'user1',
    password: '123',
  },
  {
    id: 2,
    username: 'user2',
    password: '123',
  },
  {
    id: 3,
    username: 'user3',
    password: '123',
  },
  {
    id: 4,
    username: 'user4',
    password: '123',
  }
]

app.post('/login/verify', (req, res) => {
  // console.log(req.query)

  const { username, password } = req.query
  let response = {
    success: false,
    uuid: null,
    thisUser: null
  }

  if (username && password) {
    const thisUser = user.filter(item => item.username === username && item.password === password)
    if (thisUser && thisUser.length > 0) {
      response.success = true
      response.uuid = uuidv4()
      response.thisUser = thisUser
    }
  }

  res.send(response)
})




