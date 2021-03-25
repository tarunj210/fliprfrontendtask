import React, { Component } from 'react';

import logo from '../../images/logo.svg';
import profile from '../../images/profile.svg';

class Navbar extends Component {
    


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <img src={logo} style={{ width: '100px', height: '100px' }} alt="logo" />
                <button type="button" className="intugine">Intugine</button>

                <div className={"collapse navbar-collapse "}>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Brand</a>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" href="#">Transporters<img src={profile} alt="transporter" /></span>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    };
}
export default Navbar;