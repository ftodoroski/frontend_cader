import React from 'react'
import Map from "../Components/Map"
import { connect } from "react-redux"
import { withScriptjs, withGoogleMap } from "react-google-maps"
import { tooglePropertyModal } from "../actions"
import PropertyDetailModal from "./PropertyDetailModal"
import { Table } from 'semantic-ui-react'

class PropertyDetail extends React.Component {

    state = {
        apartmentPressed: null,
        apartments: [],
        images: [],
        property: {}
    }

    componentDidMount() {
        const id = this.props.match.params.id

        fetch(`https://cader-api.herokuapp.com/api/v1/properties/${id}`)
            .then(response => response.json())
            .then(response => this.setState({
                property: response.property,
                images: response.images,
                apartments: response.apartments
            }))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.apartments !== this.state.apartments) {

        }
    }

    handleApartmentsAddRender = (tenantInfo, apartmentObj, move_in_date) => {
        const apartmentIndex = this.state.apartments.map(apartment => { return apartment.id }).indexOf(apartmentObj.id)
        console.log("This checks for the apartments" , this.state.apartments)
        console.log("This checks for the apartmentObj" , apartmentObj)
        const obj = {
            id: apartmentObj.id,
            name: apartmentObj.name,
            property_id: apartmentObj.property_id,
            occupied: true,
            move_in_date: move_in_date,
            tenant: {
                id: tenantInfo.id,
                name: tenantInfo.name
            },
        }

        let newApartments = this.state.apartments        
        newApartments.splice(apartmentIndex, 1, obj)
        this.setState({
            ...this.state,
            apartments: newApartments
        })
    }

    handleRemoveTenant = (e) => {
        const apartment = this.state.apartments.find(apartment => apartment.id === parseInt(e.target.id))

        fetch(`https://cader-api.herokuapp.com/api/v1/tenants/${apartment.tenant.id}`, { method: "DELETE" })
        .then(() => {
            const apartmentIndex = this.state.apartments.map(apartment => { return apartment.id }).indexOf(apartment.id)
            
            const obj = {
                id: apartment.id,
                name: apartment.name,
                occupied: false,
                property_id: apartment.property_id,
                move_in_date: null
            }

            let newApartments = this.state.apartments
            console.log(newApartments)
            newApartments.splice(apartmentIndex, 1, obj)
            this.setState({
                ...this.state,
                apartments: newApartments
            })
    
            this.toogleOccupiedStatus(apartment)
        })
        .catch(error => console.log(error))
    }

    toogleOccupiedStatus = (apartment) => {
        const payload = {
            occupied: false,
            move_in_date: null
        }

        const obj = {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        fetch(`https://cader-api.herokuapp.com/api/v1/apartments/${apartment.id}`, obj)
            .then(response => response.json())
            .then(data => {
                console.log("Successfully updated", data)
            })
            .catch(error => console.log("Error", error))
    }


    renderTableData = () => {
        return this.state.apartments.map(apartment => {
            return <tr>
                <td>{apartment.name}</td>
                <td>{apartment.occupied ? "true" : "false"}</td>
                <td>{apartment.tenant ? apartment.tenant.name : ""}</td>
                <td>${this.state.property.price_per_unit}</td>
                <td>{apartment.move_in_date}</td>
                <td style={{ width: "11%" }}>{apartment.occupied ? <button id={apartment.id} value="remove" onClick={(e) => this.handleRemoveTenant(e)} style={{ "font-size": "12px", width: "132px", height: "34px", "background-color": "#282828", color: "#fff" }}>Remove a Tenant</button> : <button id={apartment.id} value="add" onClick={(e) => this.handleModalApartmentPressed(e)} style={{ "font-size": "12px", width: "132px", height: "34px", "background-color": "#282828", color: "#fff" }}>Add a Tenant</button>}</td>
            </tr>
        })
    }

    handleModalApartmentPressed = (e) => {
        const apartment = this.state.apartments.find(apartment => apartment.id === parseInt(e.target.id))
        console.log(apartment) // this shows what apartment was pressed
        this.setState({
            apartmentPressed: apartment
        })
        this.props.tooglePropertyModal(true)
    }

    renderDetails = () => {
        const WrappedMap = withScriptjs(withGoogleMap(Map))

        return (
            <div className="property-detail-container">
                <div className="property-detail-images">
                    {this.state.images.map((image, idx) => {
                        return (
                            <img
                                src={image}
                                key={idx}
                                style={{ width: "24.7vw", height: "17vw" }}
                                alt="Building"
                            />
                        )
                    })}
                </div>
                <div className="property-detail-info-map-table">
                    <div className="property-detail-address">
                        <div className="property-detail-street">
                            <strong>{this.state.property.address}</strong>
                        </div>
                        <div className="property-detail-city-state-zip">
                            {this.state.property.city}, {this.state.property.state} {this.state.property.zip_code}
                        </div>
                    </div>
                    <div className="property-detail-metrics-container">

                        <div className="row1-container" style={{display: "flex", "flex-direction": "row", width: "100%", "margin-bottom": "5vw"}}>
                            <div className="item1" style={{flex: "1 1 auto", "width": "21%"}}>
                                <p className="metric-header" style={{"font-size": "1.5vw"}}>Date Purchased</p>
                                <p className="metrics-info" >01/27/2005</p>
                            </div>
                        

                            <div className="item1" style={{flex: "1 1 auto", width: "21%"}}>
                                <p className="metric-header" style={{ "font-size": "1.5vw" }}>Purchase Amount</p>
                                <p className="metrics-info">$3250000</p>
                            </div>

                            <div className="item1" style={{flex: "1 1 auto", width: "21%"}}>
                                <p className="metric-header" style={{"font-size": "1.5vw"}}>Mortgage Payable</p>
                                <p className="metrics-info">$1500000</p>
                            </div>

                            <div className="item1" style={{flex: "1 1 auto", width: "21%"}}>
                                <p className="metric-header" style={{"font-size": "1.5vw"}}>Price Per Unit</p>
                                <p className="metrics-info">$2500</p>
                            </div>

                            <div className="item1" style={{flex: "1 1 auto", width: "20%"}}>
                                <p className="metric-header" style={{"font-size": "1.5vw"}}>Revenue</p>
                                <p className="metrics-info">$15000</p>
                            </div>
                        </div>

                        <div className="row2-container" style={{display: "flex", "flex-direction": "row", width: "100%", "margin-bottom": "5vw"}}>
                            <div className="item1" style={{flex: "1 1 auto", width: "21%"}}>
                                <p className="metric-header" style={{"font-size": "1.5vw"}}>Number of Units</p>
                                <p className="metrics-info">6</p>
                            </div>

                            <div className="item1" style={{flex: "1 1 auto", width: "21%"}}>
                                <p className="metric-header" style={{"font-size": "1.5vw"}}>Occupied of Units</p>
                                <p className="metrics-info">6</p>
                            </div>

                            <div className="item1" style={{flex: "1 1 auto", width: "21%"}}>
                                <p className="metric-header" style={{"font-size": "1.5vw"}}>Cap Rate</p>
                                <p className="metrics-info">0%</p>
                            </div>

                            <div className="item1" style={{flex: "1 1 auto", width: "21%"}}>
                                <p className="metric-header" style={{"font-size": "1.5vw"}}>Property Type</p>
                                <p className="metrics-info">Multi-family</p>
                            </div>

                            <div className="item1" style={{flex: "1 1 auto", width: "20%"}}>
                                <p className="metric-header" style={{"font-size": "1.5vw"}}>Building Size</p>
                                <p className="metrics-info">20000</p>
                            </div>
                        </div>

                        <div className="row3-container" style={{"margin-bottom": "5vw"}}>
                            <div className="year-built-container">
                                <p className="metric-header" style={{"font-size": "1.5vw"}}>Year Built</p>
                                <p className="metrics-info">1997</p>
                            </div>
                        </div>

                    </div>
                    <div className="property-detail-google-map">
                        <div style={{ height: "641px", width: "100%" }} className="google-maps-api">
                            <WrappedMap
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                                loadingElement={<div style={{ height: "100%" }} />}
                                containerElement={<div style={{ height: "100%" }} />}
                                mapElement={<div style={{ height: "100%" }} />}
                            />
                        </div>
                    </div>
                    <div className="property-detail-apartments-container">
                        <div className="property-detail-apartments-table">
                            <Table className="properties-table" celled striped>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.HeaderCell style={{ height: "50px", "padding-left": "11px" }}>Apartment Id</Table.HeaderCell>
                                        <Table.HeaderCell style={{ height: "50px", "padding-left": "11px" }}>Occupied</Table.HeaderCell>
                                        <Table.HeaderCell style={{ height: "50px", "padding-left": "11px" }}>Tenant</Table.HeaderCell>
                                        <Table.HeaderCell style={{ height: "50px", "padding-left": "11px" }}>Rent</Table.HeaderCell>
                                        <Table.HeaderCell style={{ height: "50px", "padding-left": "11px" }}>Move in Date</Table.HeaderCell>
                                    </Table.Row>
                                    {this.renderTableData()}
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </div>
                <div>
                    <PropertyDetailModal
                        apartmentPressed={this.state.apartmentPressed}
                        handleApartmentsAddRender={this.handleApartmentsAddRender}
                    />
                </div>
            </div>
        )
    }

    render() {

        return (
            <div>{this.state.property && this.renderDetails()}</div>
        )
    }
}

export default connect(null, { tooglePropertyModal })(PropertyDetail)