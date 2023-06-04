import { useState, useEffect } from "react";
import { useParams, Link, useNavigate} from "react-router-dom";
import axios from "../api/axios";

const EditComment = () => {
const [editBody, setEditBody] = useState('');
const {id} = useParams();
const [comments, setComments] = useState([]);
const history = useNavigate();

const getComments = async () => {
try{
    const response = await axios.get('/comments', {withCredentials: true})

    setComments(response.data.filter((com) => com._id == id))
    console.log(response.data.filter((com) => com._id == id))
 
}
catch(err){
    console.log(err)
}
}
useEffect(() =>{
getComments()
},[])

useEffect(() => {
if(comments.length)
setEditBody(comments[0].text)

},[comments])
const handleEdit = async (id) => {
    const updatedComment ={editBody}
    console.log(updatedComment)
    try{
        const response = await axios.put(`/comments/${id}`,{text: editBody}, {withCredentials: true})
        setComments(comments.map((com) => com._id===id? {...response.data}: com))
        setEditBody('')
       
    }
    catch(err){
        console.log(err)
    }
    finally{
        history(-1);
    }
}

return (
    <main className="NewPost">
    
    <>
        <h2>Edit Post</h2>
    <form className="newPostForm" onSubmit = {(e) => e.preventDefault()}>
      
        <label htmlFor="postBody">Body: </label> 
        {comments &&
        <textarea
            id="postBody"
            required
           
            placeholder={editBody}
            value={editBody}
            onChange = {(e) => setEditBody(e.target.value)} />
        }
        <button type="submit" onClick={()=> { handleEdit(id)
    history(-1, { replace: true })}    
    }>Submit</button>      
    </form>
  </>


      
</main>
    
)
}


export default EditComment