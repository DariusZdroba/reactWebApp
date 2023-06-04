import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useUsers from '../hooks/useUsers'
import { FaSearch} from 'react-icons/fa'


const Nav = () => {
  const {auth} = useAuth();
  const [users, setUsers] = useUsers();
  const [admin, setAdmin] = useState(false);
 
  useEffect(() => {
    users && auth.user && (!(!users.filter((user) => user.username == auth.user)[0].roles.Admin)) && setAdmin(true);   
},[])

 
  return (
    <nav className="Nav">
        {users && auth.user &&
        <ul>
            
          <li><Link to={`/profile/${users.filter((user) => user.username == auth.user)[0]._id}`}>
            Profile</Link>  </li>
          <li> <Link to="/">Home</Link>  </li>
          <li> <Link to="/post">Post</Link>  </li>
          {admin &&
          <li> <Link to="/admin">Admin</Link>  </li> }
         
         
          <li> <Link to="/about">About</Link>  </li>
          

             

        </ul>
}

    </nav>
  )
}

export default Nav