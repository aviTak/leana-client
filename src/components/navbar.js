import React from 'react';
import '../css/navbar.css';
import { Link } from 'react-router-dom';

const style = {
    color: '#ffffff',
    textDecoration: 'none'
};

class Navbar extends React.Component{
    
    render(){
        return(
            <div className='main__show navbar__photo' id="navbar">
                <div className='navbar__box'>                
                    <ul>                        
                        <Link to='/' style={style}><li id='home'>Home</li></Link>
                        <Link to='/slideshow' style={style}><li id='slideshow'>Slideshow</li></Link>
                        <Link to='/about' style={style}><li id='about'>About</li></Link>
                        <Link to='/team' style={style}><li id='team'>Team</li></Link>
                        <Link to='/contact' style={style}><li id='contact'>Contact</li></Link>
                        <Link to='/social' style={style}><li id='social'>Social</li></Link>
                        <Link to='/footer' style={style}><li id='footer'>Footer</li></Link>
                        <Link to='/feedback' style={style}><li id='feedback'>Feedback</li></Link>
                        <Link to='/testimonials' style={style}><li id='testimonials'>Testimonials</li></Link>
                        <Link to='/blog' style={style}><li id='blog'>Blog</li></Link>
                        <Link to='/artwork' style={style}><li id='artwork'>Artwork</li></Link>
                        <Link to='/vlog' style={style}><li id='vlog'>Vlog</li></Link>
                        <Link to='/songs' style={style}><li id='songs'>Songs</li></Link>
                        <Link to='/creators' style={style}><li id='creators'>Creators</li></Link>
                        <Link to='/categories' style={style}><li id='categories'>Categories</li></Link>
                        <Link to='/assets' style={style}><li id='assets'>Assets</li></Link>
                    </ul>
                </div>
            </div>
        )
    }

}

export default Navbar;
