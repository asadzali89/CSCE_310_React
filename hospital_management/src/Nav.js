import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Nav(){
    return(
        <div className="topnav">
        <nav>
            <div>
            <Link activeClassName="active" to={'/'}>
            <a >Home</a>
            </Link>
            </div>
            
            <div>
            <Link activeClassName="active" to={'/Login'}>
            <a >Login/Signup</a>
            </Link>
            </div>
            <div>
            <Link activeClassName="active" to={'/Popup'}>
            <a>Doctor Login</a>
            </Link>
            </div>
            <div>
            <Link activeClassName="active" to={'/Admin-login'}>
            <a >Admin Login</a>
            </Link>
            </div>
        </nav>
        </div>
    );
}

export default Nav