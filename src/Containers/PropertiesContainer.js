import React from "react"
import { connect } from "react-redux"
import { getOwnerProperties, getOriginalOwnerProperties } from "../actions"
import PropertyCard from "../Components/PropertyCard"
import Map from "../Components/Map"
import { withScriptjs, withGoogleMap } from "react-google-maps"
import { Link } from "react-router-dom"
import AddTenantPropertiesModal from "../Components/AddTenantPropertiesModal"


class PropertiesContainer extends React.Component {

    state = {
        propertyPressed: null
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentUser !== prevProps.currentUser) {
            const owner_id = this.props.currentUser.id

            fetch(`http://localhost:3001/api/v1/owner_properties/${owner_id}`)
            .then(response => response.json())
            .then(response => {
                this.props.getOwnerProperties(response)
                this.props.getOriginalOwnerProperties(response)
            })
        } else if (prevProps.properties != this.props.properties) {

        }
    }

    componentDidMount() {
        if (this.props.currentUser) {
            const ownerId = this.props.currentUser.id

            fetch(`http://localhost:3001/api/v1/owner_properties/${ownerId}`)
                .then(response => response.json())
                .then(data => {
                    this.props.getOwnerProperties(data)
                    this.props.getOriginalOwnerProperties(data)
                })
        }
    }

    handlePropertyPressed = (propertyId) => {
        this.setState({propertyPressed: propertyId}, () => console.log(this.state.propertyPressed))
    }

    handleFilter = (e) => {
        const defaultArray = this.props.originalProperties.map(ele => ele)
        const newHighestArray = this.props.originalProperties.map(ele => ele)
        const newLowestArray = this.props.originalProperties.map(ele => ele)
        const highestRevenue = newHighestArray.sort((a, b) => b.revenue - a.revenue)
        const lowestRevenue = newLowestArray.sort((a, b) => a.revenue - b.revenue)
        

        switch(e.target.value) {
            case "highest-income":
                this.props.getOwnerProperties(highestRevenue)
                break;
            case "lowest-income":
                this.props.getOwnerProperties(lowestRevenue)
                break;
            default:
                this.props.getOwnerProperties(defaultArray)
        }
        console.log(e.target.value)
        console.log(highestRevenue)
        console.log(lowestRevenue)
    }

    render() {
        const WrappedMap = withScriptjs(withGoogleMap(Map))
        return (
            <div style={{ marginBottom: "200px"}} className="properties-container">
                <div className="properties-list-header">
                    <div className="properties-list-header-title">
                        <p><strong>Currenlty Owned Properties</strong></p>
                    </div>
                    <div className="properties-filter">
                        <select onChange={(e) => this.handleFilter(e)}>
                            <option value="default">Default</option>
                            <option value="highest-income">Highest Rental Income</option>
                            <option value="lowest-income">Lowest Rental Income</option>
                        </select>
                    </div>                        
                </div>
                <div className="properties-map-container">
                    <div className="properties">
                        {this.props.properties.map(property => {
                            return <PropertyCard key={property.id} property={property} handlePropertyPressed={this.handlePropertyPressed}/>
                        })}
                    </div>
                    <div style={{height: "900px", width: "576px"}} className="google-maps-api">
                        <WrappedMap 
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                            loadingElement={<div style={{ height: "100%" }} />}
                            containerElement={<div style={{ height: "100%" }} />}
                            mapElement={<div style={{ height: "100%" }} />}
                        />
                    </div>
                    <div>
                        <AddTenantPropertiesModal propertyPressed={this.state.propertyPressed}/>
                    </div>
                 </div>   
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        properties: state.properties, 
        modalPropertiesToogle: state.modalPropertiesToogle ,
        originalProperties: state.originalProperties
    }
}

export default connect(mapStateToProps, { getOwnerProperties, getOriginalOwnerProperties }) (PropertiesContainer)