// import './App.css'
import UserLoginComponent from './Pages/UserLogin.jsx'
import MainLayout from './Pages/MainLayout.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserList from './Pages/UserList.jsx'
import CheckAuthentication from './Components/CheckAuthentication.js'
import EditUser from './Pages/EditUser.jsx'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <CheckAuthentication>
            <MainLayout />
          </CheckAuthentication>
        }>
          <Route index element={<UserList />}></Route>
          <Route path='/editUser' element={<EditUser />}></Route>
        </Route>
        <Route path='/login' element={<UserLoginComponent />} ></Route>
      </Routes>
    </Router>
  )
}

export default App
