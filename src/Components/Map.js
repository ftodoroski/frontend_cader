import React from "react"
import { connect } from "react-redux"
import { getOwnerProperties } from "../actions"
import { GoogleMap, Marker, InfoWindow } from "react-google-maps"
import history from '../history'


class Map extends React.Component {
    state = {
        propertyCoordinates: [], 
        selected: null
    }

    componentDidMount() {
        if (history.location.pathname === "/properties") {
            const ownerId = this.props.currentUser.id
    
            fetch(`https://cader-api.herokuapp.com/api/v1/properties_coordinates/${ownerId}`)
            .then(response => response.json())
            .then(data => this.setState({propertyCoordinates: data}))   
        } else {
            const propertyId = history.location.pathname.split("/")[2]
   
            fetch(`https://cader-api.herokuapp.com/api/v1/properties_coordinates/${propertyId}`)
            .then(response => response.json())
            .then(data => this.setState({ propertyCoordinates: data }))  
        }
    }

    propertiesMarker = () => {
        this.state.propertyCoordinates.map(property => {
            return (
                <Marker
                    key={property.id}
                    position={{ lat: property.coordinates[0], lng: property.coordinates[1] }}
                    onClick={() => this.setState({ selected: property })}
                />)
        })
    }

    formatMarker = (address) => {
        const splitAddress = address.split(", ")
        return `${splitAddress[0]} ${splitAddress[1]} ${splitAddress[4]}, ${splitAddress[3]} ${splitAddress[7]}`
    }

    render() {

        return (
            <GoogleMap defaultZoom={12} defaultCenter={{ lat: 40.750274, lng: -73.944535}}>
                {this.state.propertyCoordinates.length == 2 ? 
                    <Marker
                        position={{ lat: this.state.propertyCoordinates[0], lng: this.state.propertyCoordinates[1] }}
                        onClick={() => this.setState({ selected: this.state.propertyCoordinates })}
                    />
                    
                :
                this.state.propertyCoordinates.map(property => {
                    return (
                    <Marker 
                        key={property.id} 
                        position={{lat: property.coordinates[0], lng: property.coordinates[1]}} 
                        onClick={() => this.setState({selected: property})}
                    />)
                })}
                
                { this.state.selected && (
                    <InfoWindow 
                        position={{ 
                            lat: this.state.selected.coordinates[0], 
                            lng: this.state.selected.coordinates[1]
                        }}
                        onCloseClick={() => {
                            this.setState({selected: null})
                        }}
                    >
                        <div>
                            <div><strong>{`${this.state.selected.address.split(", ")[0]} ${this.state.selected.address.split(", ")[1]} ${this.state.selected.address.split(", ")[4]}`}</strong></div>
                            <div>{`${this.state.selected.address.split(", ")[3]} ${this.state.selected.address.split(", ")[7]}`}</div>
                       </div>
                    </InfoWindow>
                )

                }
            </GoogleMap>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        properties: state.properties
    }
}

export default connect(mapStateToProps, { getOwnerProperties })(Map)