import React from 'react'
import Login from '../Components/Login'
import { connect } from 'react-redux'
import history from '../history'
import { logOut } from '../actions'
import {withRouter} from 'react-router'
import Logo from "../logoImage"
import "../styles.css"

class Navbar extends React.Component {

    handleLogOut = () => {
        localStorage.removeItem("token")
        this.props.logOut()
        this.props.history.push('/')
        
    }

    renderMenu = () => {
        return (
            <div className="navbar">
                <div className="unoccupied-list-button" >
                    <button onClick={() => this.props.history.push("/unoccupied-units")} className="nav-buttons">Unoccupied Units</button>
                </div>
                <div className="logout-button">
                    <button onClick={this.handleLogOut} className="nav-buttons">Log out</button>
                </div>
            </div>
        )
    }

    render () { 

        return (
            <div className="navbar-container">
                <div id="logo-image-container">
                    <Logo id="logo-image"/>
                </div>
                {history.location.pathname === "/" ? <Login /> : null}
                {localStorage.token && (history.location.pathname !== "/") && this.renderMenu()}
            </div>
        )
    }
}

export default withRouter(connect(null, { logOut} ) (Navbar))