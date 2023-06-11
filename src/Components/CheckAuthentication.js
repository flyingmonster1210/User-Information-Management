import { Navigate, useNavigate } from "react-router-dom"
import AuthenticationService from "../Services/AuthenticationService"


function CheckAuthentication (props) {
  // console.log(props)
  const navigate = useNavigate()
  if (AuthenticationService.isUserLoggedIn()) {
    return props.children
  } else {
    // navigate('/login', { replace: true })
    return <Navigate to='/login' replace></Navigate>
  }
}

export default CheckAuthentication

