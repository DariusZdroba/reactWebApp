import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { format } from 'date-fns'
import useUsers from "../hooks/useUsers";
import { FaSearch} from 'react-icons/fa'
const Home = () => {
    const [users, setUsers] = useUsers();
    const [postBody, setPostBody] = useState({File: "", user: "", title:"", comment:"", date:""})
    const [comment, setComment] = useState()
    const [title, setTitle] = useState('')
    const [post, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const {auth} = useAuth();
    const [isPosting, setIsPosting] = useState(false)
    const [search, setSearch] = useState('');
    const [searchProfile, setSearchProfile] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [submit, setSubmit] = useState(1);
    const [id, setId] = useState();
    const [postLength, setPostLength] = useState(4);
    const createPost = async (newImage) => {
        try{
            if(newImage.File){
            newImage.title = title;
            newImage.comment=comment;
            newImage.date = format(new Date(), 'MMMM dd, yyyy pp');
            await axios.post('/uploads', newImage)
            
            } 
        }
        catch(err){
            console.log(err)
        }
    }
    const getPost = async () => {
        const response = await axios.get('/uploads', {withCredentials: true})
        setPosts(response.data.reverse());
        setLoading(false);
        
    }
  
    useEffect(() => {
        getPost()
    },[])
  


    const handleSubmit = async (e) => {
        e.preventDefault();
       
        await createPost(postBody);
        await getPost();
        setLoading(false)
        setTitle('')
        setComment('')
        setPostBody({File: "", user: "", title:"", comment:""})
        handleIsPosting();
        setSubmit(prev => prev+1)
    }
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64= await convertToBase64(file)
        setLoading(true)

        setPostBody({...postBody, File: base64, user: auth.user});
    }
    const navigate = useNavigate();
    const logout = useLogout();
    const signOut = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        await logout();
        navigate('/linkpage');
    }
    const handleIsPosting = () => {
        setIsPosting(prev => !prev)
    }

    useEffect(() => {
        const filteredResults = post.filter(post => ((post.comment).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()) || ((post.user).toLowerCase()).includes(search.toLowerCase())
        )
        setSearchResults(filteredResults)
    },[post, search])

    const handleProfile = (post) => {
        navigate(`/profile/${users.filter((user) => user.username == post.user)[0]._id}`)
        
        
    }
    const loadMore = () => {
        setPostLength(prev => prev+4);
    }

    return (
        
        <section>
        {auth.user ?
            <>        
             <label htmlFor="search">Search Posts</label>
          <input
              id="search"
              type="text"
              placeholder="Search Posts"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
             <label htmlFor="searchProfile" id="searchProfileLabel">
             <FaSearch id="searchIcon" 
             onClick={() => navigate('/users',{ state: {searchProfile}})}
             />
             </label>
          <input
              id="searchProfile"
              type="text"
              placeholder="Search Profile"
              value={searchProfile}
              onChange={(e) => setSearchProfile(e.target.value)}
            />
           
          

            {!isPosting && 
            <button onClick={handleIsPosting}>new post</button> }
          {isPosting && 
          <>
          
            <form onSubmit={handleSubmit}>
                <label htmlFor="file">
                <div className="file-upload">Upload your photo</div>
                
                </label>
                <input 
                className="inputHide"
                type="file"
                label="image"
                name="File"
                id="file"
                accept=".jpg, .png, .jpeg"
                onChange={(e) => handleFileUpload(e)}
                required
                />
               <div className="imgAndTextWrapper">
                <label id="title">title</label>
                <input 
                type="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                autoComplete="off"
                required
                />
                <label id="comment">comment</label>
                <textarea 
                type="text"
                id="comment"
                autoComplete="off"
                value={comment}
                onChange={(e) => setComment(e.target.value)
                }
                required
               />
               <img src={postBody.File} id="uploadImage" alt=""/>
               </div>
                <button type="submit">Submit</button>
                <button onClick={handleIsPosting}>cancel</button>
            </form>
            </>
            }

            <br />
          <>
        {searchResults.length?
          <> 
           
            {searchResults.slice(0,postLength).map((post) => (
                post ? (
               <div  key={post._id} className="wrapper"  id="post">
                 <Link to={`/PostPage/${post._id}`}>
                    {/* If title or comment > 25 characters, we slice them , they are visible on post page*/}
                    <h2 className="postTitle">{(post.title).length<=25 
                        ? post.title
                        : `${(post.title).slice(0,25)}...`
                        
                        }</h2>
                         <p className="postBy" onClick={() => handleProfile(post)}>
                 by {post.user}
                 </p>
                    </Link>    
                <Link to={`/PostPage/${post._id}`}>
                <div className="imageWrapper">
                    
                 <img id="images" src={post.File} alt="red dot"/>
                 </div>
                    </Link>
                <div className="secondWrapper">
                    
                    <p className="postComment">
                    {(post.comment).length<=25 
                        ? post.comment
                        : `${(post.comment).slice(0,25)}...`
                        
                        }</p>
                
                 <p className="date">{post.date}</p>
                 </div>
                 </div > ) : <p>loading post</p>
            ))}
            </> : 
            <>
              {post.map((post) => (
                post ? (
               <div  key={post._id} className="wrapper"  id="post">
                <Link to={`/PostPage/${post._id}`}>
                 <img id="images" className="postImage"src={post.File} alt="red dot"/>
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
                        
                 <p className="postBy">
                 by {post.user}
                 </p>
                 <p className="date">{post.date}</p>
                 </div>
                 </div > ) : <p>loading post</p>
            ))}
            
             </>
                
}           
            {postLength < post.length &&
             <button onClick={loadMore}>Load more...</button>
            }
             </> 
           
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
            </> : navigate('/login') }
        </section>
    )
}

export default Home


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