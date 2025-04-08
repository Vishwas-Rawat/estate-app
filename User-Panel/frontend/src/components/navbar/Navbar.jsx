import React from "react";
import "./Navbar.css"
import logo from '../../assets/logo.png'
import { NavLink } from "react-router-dom";
function Navbar(){
    const token = localStorage.getItem('eStateToken');
    function handleLogout(){
        localStorage.removeItem('eStateToken');
        localStorage.removeItem('eState-userId');
        location.reload();
    }
    return (
        <>
            <div className="mainNavbarDiv">
                <div className="mainLogoDiv">
                    
                    <h2><img style={{marginRight: '10px'}} height={40} src={logo} alt="" /> Logo</h2>
                </div>
                <div className="mainOptionsDiv">
                    {token ? (
                        <ul>
                            <NavLink to="/"><button className="btn bg-primary m-2 text-light">Home</button></NavLink>
                        <button onClick={handleLogout} className="btn bg-danger m-2 text-light">Logout</button>
                    </ul>
                    ):<ul>
                    <NavLink to="/"><button style={{width:'fit-content', borderRadius:'10px'}} className="btn bg-primary m-2 text-light">Home</button></NavLink>
                    <NavLink to="/login"><button style={{width:'fit-content', borderRadius:'10px'}} className="btn bg-success m-2 text-light">Login</button></NavLink>
                    <NavLink to="/register"><button style={{width:'fit-content', borderRadius:'10px'}} className="btn bg-success m-2 text-light">Register</button></NavLink>
                </ul>}
                    
                </div>
            </div>
        </>
    )
}

export default Navbar;