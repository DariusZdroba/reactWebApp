import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Missing = () => {
  const {auth} = useAuth()
  return (
    <section>
     
        <h1>The page you are looking for is missing !</h1>
        
          {!auth.user &&
          <>
          <Link to="/login"> 
          <button>Go to login page</button>
          </Link>
          
          </>}
           {auth.user && 
           <>
           <Link to="/">
           <button>Go to home page</button>
           </Link>
           </> }
    </section>
  )
}

export default Missing