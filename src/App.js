// import './App.css'
import Test from './Pages/Test.jsx'
import UserLoginComponent from './Pages/UserLogin.jsx'
import MainLayout from './Pages/MainLayout.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserList from './Pages/UserList.jsx'
import CheckAuthentication from './Components/CheckAuthentication.js'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CheckAuthentication>
          <Test />
        </CheckAuthentication>}></Route>
        <Route path='/t' element={<MainLayout />} >
          <Route index element={
            <>
              <UserList />
            </>
          }>
          </Route>
        </Route>
        <Route path='/login' element={<UserLoginComponent />} ></Route>
      </Routes>
    </Router>
  )
}

export default App
