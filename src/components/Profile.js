import React from 'react'
import useAuth from '../hooks/useAuth'
import { useParams, useNavigate, Link} from 'react-router-dom';
import useUsers from '../hooks/useUsers';
import usePosts from '../hooks/getPosts';
import { useState, useEffect } from 'react';
import axios from '../api/axios';

const Profile = () => {
  const navigate = useNavigate();
  const {auth} = useAuth();
  const {id} = useParams();
  const [users, setUsers] = useUsers();
  const [postBody, setPostBody] = useState({profile:""})
  const [admin, setAdmin] = useState(false);
  const [posted, setPosted] = useState(false);
  const [posts, setPosts] = usePosts();
  const [userById, setUserById] = useState();
  const [postLength, setPostLength] = useState(4);
  useEffect(() => {
    users&&
    setUserById(users.filter((user) => user._id == id))
    
  },[users])

  useEffect(() => {
    users && (!(!users.filter((user) => user.username == auth.user)[0].roles.Admin)) && setAdmin(true);   
},[users])
 
  
  const [userProfile, setUserProfile] = useState();
  useEffect(() => {
    users && 
      setUserProfile(users.filter((user) => user._id == id))
      
  },[users])
  
  const handleFileUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const base64= await convertToBase64(file)
    setPostBody({...postBody, profile: base64})
    setPosted(true)
     
  }

  const updateFile = async (image) => {
    try {
      
      await axios.put(`/users/${id}`, {profile: image.profile}, {withCredentials: true})
    }
    catch(err){
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    setPosted(false)
    e.preventDefault();
    await updateFile(postBody);
    setPostBody({...postBody, profile:""})
    

  }
  const loadMore = () => {
    setPostLength(prev => prev+4);
}
  return (
    
   
    <section>
      {users &&
      <>
     {auth.user ?
     <>
    {userProfile && userById &&
       <>
       {(userProfile[0].username == auth.user || admin) ?
       <form onSubmit={handleSubmit}>
        <label htmlFor="profileUpload">
        <img className="profilePic" src ={postBody.profile || userProfile[0].profile} />
        </label>
        <input 
                className="inputHide"
                type="file"
                label="image"
                name="File"
                id="profileUpload"
                accept=".jpg, .png, .jpeg"
                onChange={(e) => handleFileUpload(e)}
                required
                />
            {posted &&
          <button>submit</button> 
            }
      </form>
      :
      <img className="profilePic" src ={userProfile[0].profile} />
    }
       <h1 className="profileName">{userProfile[0].username}</h1>
       </>
       }
       </>
       : navigate('/login')
}   
    <h1>Posts: </h1>
      {posts && posts.slice(0, postLength).map((post) => post.user == userById[0].username &&
        <div  key={post._id} className="wrapper"  id="post">
        <Link to={`/PostPage/${post._id}`}>
         <img id="images" src={post.File} alt="red dot"/>
            </Link>
        <div className="secondWrapper">
             <Link to={`/PostPage/${post._id}`}>
            {/* If title or comment > 25 characters, we slice them , they are visible on post page*/}
            <h2 className="postTitle">{(post.title).length<=25 
                ? post.title
                : `${(post.title).slice(0,25)}...`
                
                }</h2>
            </Link>    
            <p className="postComment">
            {(post.comment).length<=25 
                ? post.comment
                : `${(post.comment).slice(0,25)}...`
                
                }</p>
       
         <p className="date">{post.date}</p>
         </div>
         </div >
       
      )}
      <button onClick={loadMore}>Load more..</button>
      </>}
       </section>
    

  )
}

export default Profile




function convertToBase64(file){
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
          resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
          reject(error)
      }
  
  })
}


