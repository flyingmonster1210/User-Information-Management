import './App.css'
import UserLoginComponent from './Pages/UserLogin.jsx'
import MainLayout from './Pages/MainLayout.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<UserLoginComponent />} />
        <Route path='/admin' element={<MainLayout />} />
      </Routes>
    </Router>
  )
}

export default App
