import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
const Layout = () => {
    return(
        <main className="App">
            <Header />
            <Nav />
            <Outlet />

        </main>

    )
}

export default Layout