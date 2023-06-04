import React from 'react'
import ButtonMailto from './ButtonMailto'
import { FaInstagram, FaGithub, FaLinkedin, FaFacebook, FaEnvelope} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const About = () => {
  return (
    <section>
        <h1>Această pagină a fost creată de către
            Zdroba Darius
        </h1>
        <br />

        <h2>Contact: </h2>
        <br />
        <p>Email:</p>
        <br />
        <FaEnvelope id="envelope" />
        <ButtonMailto label="dariuszdroba@gmail.com" mailto="mailto:dariuszdroba@gmail.com" />
        <br />
        <br />
        
        <a target="_blank" href="https://www.instagram.com/dariuszdroba/">
          
         <FaInstagram size={50} />
         </a>
        
        <a target="_blank" href="https://github.com/DariusZdroba">

         <FaGithub size={50} />
         </a>
        
        <a target="_blank" href="linkedin.com/in/darius-zdroba-065a71256/">

         <FaLinkedin size={50} />
         </a>
        
        <a target="_blank" href="https://www.facebook.com/Zdroba.Darius/">

         <FaFacebook size={50} />
         </a>
        
        

    </section>
  )
}

export default About