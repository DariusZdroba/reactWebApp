import { useState, useEffect } from "react"
import axios from "../api/axios";
const usePosts = () => {
    const [posts, setPosts] = useState([]);
        useEffect(() => {
            const getPost = async () => {
                const response = await axios.get('/uploads', {withCredentials: true})
                console.log(response.data)
                setPosts(response.data.reverse());
              
                
            }
      
            getPost()
    
    },[])
    return [posts, setPosts]
}

export default usePosts