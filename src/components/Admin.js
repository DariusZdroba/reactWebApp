
import { getMonth} from "date-fns"
import usePosts from "../hooks/getPosts"
import { useState , useEffect} from "react"
import LineChart from "./LineChart"
const Admin = () => {
  const [postPerDay, setPostPerDay] = useState([])
  const [actualData, setActualData] = useState([]);
 
  let dateCount = [];
  for(let i=0;i<=31;i++) dateCount[i] =0;
  

  const [posts, setPosts] = usePosts()
  const monthToNum = (month) => {
    switch(month) {
      case "January": 
      case 1:
      return {month: 1, days: 31};
      break;
    case "February":
    case 2: 
      return {month: 2, days: 28};
      break;
    case "March" :
    case 3:
      return {month: 3, days: 31};
      break;
    case "April":
    case 4:  
       return {month: 4, days: 30};
      break;
    case "May":
    case 5: 
      return {month: 5, days: 31};
      break;
      case "June":
      case 6:  
        return {month: 6, days: 30};
        break;
    case "July":
    case 7: 
      return {month: 7, days: 31};
      break;
    case "August":
    case 8: 
      return {month: 8, days: 31};
      break;
    case "September" || 9:
      return {month: 9, days: 30};
      break;
    case "October" || 10:
      return {month: 10, days: 31};
      break;
    case "November" || 11:
      return {month: 11, days: 30};
      break;
    case "December" || 12 :
      return {month: 12, days: 31};
      break;
    default: return {month: 6, days: 30}
        }
  }
  let thisMonth = [];
  for(let i=0;i<monthToNum(getMonth(new Date())).days;i++) thisMonth[i] = i+1;
  
  const [dates, setDates] = useState();
  
 
  useEffect(() => {
    posts && setDates(posts.map((post) => post.date));
    dates && dates.map((date) => monthToNum(date.split(" ")[0]).month == getMonth(new Date()) && dateCount[Number(date.split(" ")[1].split(",")[0])]++)
      setPostPerDay(dateCount);
      
      //thisMonth.map((post) => console.log(post))
      let actData = [{}]
      for(let j=0;j<thisMonth.length;j++) {actData[j] = {
        day: j,
        posts: postPerDay[j]
      }
      }
      setActualData(actData);
      
      
  }, [posts, dates, postPerDay, thisMonth.length, dateCount])
  useEffect(() => {
    dates && dates.map((date) => monthToNum(date.split(" ")[0]).month == getMonth(new Date()) && dateCount[Number(date.split(" ")[1].split(",")[0])]++)
      setPostPerDay(dateCount);
  },[dates, dateCount])
 
  
  const handleClick = () => {

   console.log(postPerDay)
    } 
  return (
   <section>
    <h2>Posts last month (0{getMonth(new Date())}/2023)</h2>
       
    <div id="chart" >
    {dates &&  <LineChart actualData={actualData} />
        }
        </div>
 </section>
  )
}

export default Admin