import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import useUsers from "../hooks/useUsers"

const Users = () => {
    const [users, setUsers] = useUsers();
    const {state} = useLocation();
    const search = state.searchProfile;
    console.log("state is", search);

   

    return (
        
        <article>
            
            <div>{console.log("users length is ")}</div>
            <h2>Users found by searching " {search} "</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{
                            user.username.includes(search) && (<div>
                                <Link to={`/profile/${user._id}`} >
                                {user.username} 
                                </Link>
                            </div>) 
                           }</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
           
        </article>
    );
};

export default Users;
