// import './App.css'
import Test from './Pages/Test.jsx'
import UserLoginComponent from './Pages/UserLogin.jsx'
import MainLayout from './Pages/MainLayout.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserList from './Pages/UserList.jsx'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Test />} ></Route>
        <Route path='/login' element={<UserLoginComponent />} ></Route>
        <Route path='/admin' element={<MainLayout />} >
          <Route path='/admin/userList' element={<UserList />}></Route>
        </Route>
        {/* <Route path='/userList' element={<UserList />}></Route> */}


      </Routes>
    </Router>
  )
}

export default App
