import React from 'react'
import { FaLaptop, FaTabletAlt, FaMobileAlt} from 'react-icons/fa'
import useWindowSize from '../hooks/useWindowSize'


const Header = (  ) => {
  const { width } = useWindowSize()
  return (
    <header className="Header">
            <h1 id="headerTitle">zenGen</h1>
            {width < 768 ? <FaMobileAlt className="famobile" size={25} /> : width < 992 ? <FaTabletAlt className="fatablet" size={35}/> : <FaLaptop className="falaptop" size={55}/>}
    </header>
    )
}

export default Header