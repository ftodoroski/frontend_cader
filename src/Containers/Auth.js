import React from 'react'
import Signup from "../Components/Signup";
import { useHistory } from 'react-router-dom'
import CursorIcon from "../IconsSVG/CursorIcon"
import DBIcon from "../IconsSVG/DBIcon"
import AvatarIcon from "../IconsSVG/AvatarIcon"

const Auth = () => {
    const history = useHistory()
        return (
            <div className="auth-container">
                <div className="auth-info-container">
                    <div className="auth-info-header">
                        <h1>See the bigger picture. Control and insight <br/>with cader.</h1>
                    </div>
                    <div className="map-location-info-container">
                        <div className="svg-cursor">
                            <CursorIcon id="cursor-icon"/>
                        </div>
                        <div className="map-location-info">
                            <p><span className="bolded-words" style={{ "font-weight": 700 }}>Map location</span> of all of your projects</p>
                        </div>
                    </div>
                    <div className="map-location-info-container">
                        <div className="svg-cursor">
                            <DBIcon id="cursor-icon"/>
                        </div>
                        <div className="map-location-info">
                            <p><span className="bolded-words">Valuable insight</span> for managing your portfolio</p>
                        </div>
                    </div>
                    <div className="map-location-info-container">
                        <div className="svg-cursor">
                            <AvatarIcon id="team-icon"/>
                        </div>
                        <div className="map-location-info">
                            <p><span className="bolded-words">Capabilities</span> for tenant managment</p>
                        </div>
                    </div>
                </div>
                <div className="signup-container">
                    <Signup history={history}/>
                </div>
            </div>
        )
        
}

export default Auth