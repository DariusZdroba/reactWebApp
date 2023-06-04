import { Link } from "react-router-dom"


const Editor = () => {
  return (
    <section>
        <h1>Editors page</h1>
        <p>You have an editor role</p>
        <div className="flexGrow">
            <Link to="/">Home</Link>
        </div>
        <div className="flexGrow">
            <Link to="/login">Login</Link>
        </div>
        <div className="flexGrow">
            <Link to="/register">Register</Link>
        </div>
        <div className="flexGrow">
            <Link to="/lounge">Lounge</Link>
        </div>
        <div className="flexGrow">
            <Link to="/editor">Editor</Link>
        </div>
        
        <div className="flexGrow">
            <Link to="/admin">Admin</Link>
        </div>
    </section>
  )
}

export default Editor