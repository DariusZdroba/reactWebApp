import { useState, useEffect} from "react"
import axios from "../api/axios";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import {format} from 'date-fns';
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Lounge = () => {
  const {id} = useParams();
  const {auth} = useAuth();  
  const [comment, setComment] = useState({text:"",commentor:"", commentedOn:"", date:""});
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
 
  const [posts, setPosts] = useState([]);

  const getComments = async () => {
    const response = await axios.get('/comments', {withCredentials: true})
  //  const filteredComments = response.data.filter((com) => com._id == id)
    //setComments(filteredComments)
    setComments(response.data.filter((com) => com.commentedOn == posts.user))
}

const [users, setUsers] = useState();
const axiosPrivate = useAxiosPrivate();
const navigate = useNavigate();
const location = useLocation();
const [admin, setAdmin] = useState(false)
const [postComment, setPostComment] = useState('')
const [postTitle, setPostTitle] = useState('');
const [edit, setEdit] = useState(false)
const [edited, setEdited] = useState(false)

useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.get('/users', {
                signal: controller.signal
            });
           
            isMounted && setUsers(response.data);
          
        
        } catch (err) {
            console.error(err);
            
        }
    }

    getUsers();
    

    return () => {
        isMounted = false;
        controller.abort();
    }
}, [])

useEffect(() => {
    users && (!(!users.filter((user) => user.username == auth.user)[0].roles.Admin)) && setAdmin(true);   
},[users])

useEffect(() => {
    const getPost = async () => {
        
        const response = await axios.get(`/post/${id}`, {withCredentials: true})
        setPosts(response.data);
        setPostComment(posts.comment)
        setPostTitle(posts.title)
       
    }
    getPost();
   
},[edit, edited])

useEffect(() => {
    getComments();
},[posts])

const createComment = async (newComment) => {
    try{
        newComment.text = commentText;
        newComment.commentor = auth.user;
        newComment.commentedOn = posts.user;
        newComment.date = format(new Date(), 'MMMM dd, yyyy pp');
        await axios.post('/comments', newComment)
    }
    catch (err) {
        console.log(err)
    }

}
const handleSubmit = async (e) => {
    e.preventDefault();
   await createComment(comment)
    setCommentText('')
    getComments();
}
const handleDelete = async (id) => {
    try{
    await axios.delete(`/comments`, {
        headers: {
          Authorization: auth.accessToken
        },
        data: {
          _id: id
        }
      });
      console.log('comment deleted')
      
      setComments(comments.filter((comment) =>comment._id !== id))
    }
    catch(err){
        console.log(err);
    }
}
const toggleEdit = () => {
    setEdit(prev => !prev)
}
const handleEdit = async (e) => {
    e.preventDefault();
    toggleEdit();
    if(posts.user === auth.user || admin){
    try { 
        await axios.put(`/uploads/${posts._id}`, {title: postTitle, comment: postComment}, {withCredentials: true})
        setEdited(prev => !prev)
        setPostComment(posts.comment)
        setPostTitle(posts.title)
    }
    catch(err){
        console.error(err)
    }}
    else
    alert('no access')    
   
}

    const postDelete = async () => {
        if(posts.user === auth.user || admin){
        await axios.delete('/uploads', {
            headers: {
              Authorization: auth.accessToken
            },
            data: {
              user: posts.user
            }
          });
          navigate('/')
        }
        else alert('no access')
    }

    const handleProfile = (post) => {
        navigate(`/profile/${users.filter((user) => user.username == post.commentor)[0]._id}`)
        
        
    }

        return (
    <section>
     
    
        <div className="flexGrow">
          <img src ={posts.File} alt="t" />
        </div>
            {!edit &&
            <>
            <h1>{posts.title}</h1>
           <h5>{posts.comment}</h5>
            </>
                }   
                {edit &&
                <>
                    <form onSubmit={handleEdit}>
                <label id="titleEdit">Title</label>
                    <input 
                    type="text"
                    id="titleEdit"
                    autoComplete="off"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    />
                     <label id="titleEdit">Comment:</label>
                    <input 
                    type="text"
                    id="titleEdit"
                    autoComplete="off"
                    value={postComment}
                    onChange={(e) => setPostComment(e.target.value)}
                    />
                    <button onClick={handleEdit}>submit edit</button>
                    </form>
                </>
                }
            {!edit &&
                <>
        <form onSubmit={handleSubmit}>              
             <label id="comment">comment</label>
                <input 
                type="text"
                id="comment"
                autoComplete="off"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)
                }
                required
               />
                <button type="submit">Submit</button>
                </form>
                </>  
}              {(posts.user === auth.user || admin) &&
                 <div className ="buttonWrapper">
               <button onClick={toggleEdit} className="editButton">Edit</button> 
               <button onClick={postDelete} className="deleteButton">Delete Post</button>
                  </div> 
                                  }
                <>
            {comments.map((com) => (
                com ? com.text && (
                    
               <div  key={com._id} className="comment" >
                <div id="profileCommentor" onClick={() => handleProfile(com)}>
                {users && users.map((user) => user.username == com.commentor && <img className ="commProfile"src={user.profile} />
                
                )
                }
                <h2 className="commentor" id="profileByCom" >{com.commentor}</h2>
                </div>
                <p className="commentor">{com.text}</p>
                <p className="date">{com.date}</p>
                <>
                {(com.commentor == auth.user || admin) &&
                
                <button className="deleteCommentButton" onClick={() => handleDelete(com._id) }> delete</button> }
                 {(com.commentor == auth.user || admin) &&
                 <Link to ={`/edit/${com._id}`}>
                <button className="editCommentButton">edit comment</button>
                </Link> }     
              </>
                <br /> <br />
                 </div> ) : <p>loading post</p>

           
           ))}
            </>
            

           

    </section>
  )
}

export default Lounge