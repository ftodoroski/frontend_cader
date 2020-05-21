// import React from 'react'
// import Map from "../Components/Map"
// import { connect } from "react-redux"
// import { withScriptjs, withGoogleMap } from "react-google-maps"
// import { tooglePropertyModal } from "../actions"
// import PropertyDetailModal from "./PropertyDetailModal"
// import { Table } from 'semantic-ui-react'

// class PropertyDetail extends React.Component {

//     state = {
//         apartmentPressed: null, 
//         apartments: [], 
//         images: [], 
//         property: {}
//     }

//     componentDidMount() {
//         const id = this.props.match.params.id
        
//         fetch(`http://localhost:3001/api/v1/properties/${id}`)
//             .then(response => response.json())
//             .then(response => this.setState({
//                 property: response.property,
//                 images: response.images,
//                 apartments: response.apartments
//             }))
//     }

//     componentDidUpdate(prevProps, prevState) {
//         if (prevState.apartments !== this.state.apartments) {

//         }
//     }

//     // Here
//     handleApartmentsAddRender = (tenantInfo, apartmentObj, move_in_date) => {
//         const apartmentIndex = this.state.apartments.map(apartment => { return apartment.id }).indexOf(apartmentObj.id)
//         const obj = {
//             move_in_date: move_in_date,
//             name: apartmentObj.name,
//             occupied: true,
//             property_id: apartmentObj.property_id,
//             tenant: {
//                 id: tenantInfo.id,
//                 name: tenantInfo.name
//             }, 
//             id: tenantInfo.id
//         }

//         // console.log("TenantInfo" ,tenantInfo)
//         let newApartments = this.state.apartments
//         // console.log("New Apartments", newApartments)
//         newApartments.splice(apartmentIndex, 1, obj)
//         this.setState({
//             ...this.state,
//             apartments: newApartments
//         })
//     }

//     // Here
//     deleteTenant = (tenantId) => {
//         fetch(`http://127.0.0.1:3001/api/v1/tenants/${tenantId}`, { method: "DELETE" })
//     }

//     // Here
//     handleRemoveTenant = (e) => {
//         const apartment = this.state.apartments.find(apartment => apartment.id === parseInt(e.target.id))
//         console.log("This is checking for the apartment", apartment)
//         console.log("This is checking for the apartment/tenant", apartment.tenant)
//         console.log("This is checking for the apartment/tenant/id", apartment.tenant.id)
//         this.deleteTenant(apartment.tenant.id)

//         const apartmentIndex = this.state.apartments.map(apartment => { return apartment.id }).indexOf(apartment.id)
//         console.log("inside the handleRemoveTenant", apartment)
//         const obj = {
//             move_in_date: "",
//             id: apartment.id,
//             name: apartment.name,
//             occupied: false,
//             property_id: apartment.property_id,
//         }

//         let newApartments = this.state.apartments
//         // console.log(newApartments)
//         newApartments.splice(apartmentIndex, 1, obj)
//         this.setState({
//             ...this.state,
//             apartments: newApartments
//         })

//         this.toogleOccupiedStatus(apartment)
//     }

//     // Here
//     toogleOccupiedStatus = (apartment) => {
//         const payload = {
//             occupied: false,
//             move_in_date: null
//         }

//         const obj = {
//             method: "PATCH",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(payload)
//         }

//         fetch(`http://localhost:3001/api/v1/apartments/${apartment.id}`, obj)
//             .then(response => response.json())
//             .then(data => {
//                 console.log("Successfully updated", data)
//             })
//             .catch(error => console.log("Error", error))
//     }


//     renderTableData = () => {
//         return this.state.apartments.map(apartment => {
//             return <tr>
//                 <td>{apartment.name}</td>
//                 <td>{apartment.occupied ? "true" : "false"}</td>
//                 <td>{apartment.tenant ? apartment.tenant.name : ""}</td>
//                 <td>${this.state.property.price_per_unit}</td>
//                 <td>{apartment.move_in_date}</td>
//                 <td style={{width: "11%" }}>{apartment.occupied ? <button id={apartment.id} value="remove" onClick={(e) => this.handleRemoveTenant(e)} style={{ "font-size": "12px", width: "132px", height: "34px", "background-color": "#282828", color: "#fff" }}>Remove a Tenant</button> : <button id={apartment.id} value="add" onClick={(e) => this.handleModalApartmentPressed(e)} style={{ "font-size": "12px", width: "132px", height: "34px", "background-color": "#282828", color: "#fff" }}>Add a Tenant</button>}</td>
//             </tr>
//         })
//     }

//     handleModalApartmentPressed = (e) => {
//         const apartment = this.state.apartments.find(apartment => apartment.id === parseInt(e.target.id))
//         // console.log(apartment)
//         this.setState({
//             apartmentPressed: apartment
//         })
//         this.props.tooglePropertyModal(true)
//     }

//     renderDetails = () => {
//         const WrappedMap = withScriptjs(withGoogleMap(Map))

//         return (
//             <div className="property-detail-container">
//                 <div className="property-detail-images">
//                     {this.state.images.map((image, idx) => {
//                         return (
//                             <img
//                                 src={image}
//                                 key={idx}
//                                 style={{ width: "475px", height: "313.81px" }}
//                                 alt="Building"
//                             />
//                         )
//                     })}
//                 </div>
//                 <div className="property-detail-info-map-table">
//                     <div className="property-detail-address">
//                         <div className="property-detail-street">
//                             <strong>{this.state.property.address}</strong>
//                         </div>
//                         <div className="property-detail-city-state-zip">
//                             {this.state.property.city}, {this.state.property.state} {this.state.property.zip_code}
//                         </div>
//                     </div>
//                     <div className="property-detail-metrics-container">
//                         <div className="date-purchased-container">
//                             <p className="metric-header">Date Purchased</p>
//                             <p className="metrics-info">{this.state.property.date_purchased}</p>
//                         </div>
//                         <div className="purchased-amount-container">
//                             <p className="metric-header">Purchase Amount</p>
//                             <p className="metrics-info">${this.state.property.purchased_amount}</p>
//                         </div>
//                         <div className="mortgage-payable-container">
//                             <p className="metric-header">Mortgage Payable</p>
//                             <p className="metrics-info">${this.state.property.mortgage_payable}</p>
//                         </div>
//                         <div className="price-per-unit-container">
//                             <p className="metric-header">Price Per Unit</p>
//                             <p className="metrics-info">${this.state.property.price_per_unit}</p>
//                         </div>
//                         <div className="revenue-container">
//                             <p className="metric-header">Revenue</p>
//                             <p className="metrics-info">${this.state.property.revenue}</p>
//                         </div>
//                         <div className="number-of-units-container">
//                             <p className="metric-header">Number of Units</p>
//                             <p className="metrics-info">{this.state.property.number_of_units}</p>
//                         </div>
//                         <div className="occupied-units-container">
//                             <p className="metric-header">Occupied of Units</p>
//                             <p className="metrics-info">{this.state.property.occupied_units}</p>
//                         </div>
//                         <div className="cap-rate-container">
//                             <p className="metric-header">Cap Rate</p>
//                             <p className="metrics-info">{this.state.property.cap_rate}%</p>
//                         </div>
//                         <div className="property-type-container">
//                             <p className="metric-header">Property Type</p>
//                             <p className="metrics-info">{this.state.property.property_type}</p>
//                         </div>
//                         <div className="building-size-container">
//                             <p className="metric-header">Building Size</p>
//                             <p className="metrics-info">{this.state.property.building_size}</p>
//                         </div>
//                         <div className="year-built-container">
//                             <p className="metric-header">Year Built</p>
//                             <p className="metrics-info">{this.state.property.year_built}</p>
//                         </div>
//                     </div>
//                     <div className="property-detail-google-map">
//                         <div style={{ height: "641px", width: "1524px" }} className="google-maps-api">
//                             <WrappedMap
//                                 googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
//                                 loadingElement={<div style={{ height: "100%" }} />}
//                                 containerElement={<div style={{ height: "100%" }} />}
//                                 mapElement={<div style={{ height: "100%" }} />}
//                             />
//                         </div>
//                     </div>
//                     <div className="property-detail-apartments-container">
//                         <div className="property-detail-apartments-table">
//                             <Table className="properties-table" celled striped>
//                                 <Table.Body>
//                                     <Table.Row>
//                                         <Table.HeaderCell style={{height: "50px", "padding-left": "11px"}}>Apartment Id</Table.HeaderCell>
//                                         <Table.HeaderCell style={{height: "50px", "padding-left": "11px"}}>Occupied</Table.HeaderCell>
//                                         <Table.HeaderCell style={{height: "50px", "padding-left": "11px"}}>Tenant</Table.HeaderCell>
//                                         <Table.HeaderCell style={{height: "50px", "padding-left": "11px"}}>Rent</Table.HeaderCell>
//                                         <Table.HeaderCell style={{height: "50px", "padding-left": "11px"}}>Move in Date</Table.HeaderCell>
//                                     </Table.Row>
//                                     {this.renderTableData()}
//                                 </Table.Body>
//                             </Table>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <PropertyDetailModal
//                         apartmentPressed={this.state.apartmentPressed}
//                         handleApartmentsAddRender={this.handleApartmentsAddRender}
//                     />
//                 </div>
//             </div>
//         )
//     }

//     render() {
//         // console.log("Checking for state", this.state)

//         return (
//             <div>{this.state.property && this.renderDetails()}</div>
//         )
//     }
// }

// // const mapStateToProps = {

// // }

// export default connect(null, { tooglePropertyModal })(PropertyDetail)

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

        fetch(`http://localhost:3001/api/v1/properties/${id}`)
            .then(response => response.json())
            .then(response => this.setState({
                property: response.property,
                images: response.images,
                apartments: response.apartments
            }, () => console.log(this.state)))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.apartments !== this.state.apartments) {

        }
    }

    // Here
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

        // console.log("TenantInfo" ,tenantInfo)
        let newApartments = this.state.apartments
        // console.log("New Apartments", newApartments)
        newApartments.splice(apartmentIndex, 1, obj)
        this.setState({
            ...this.state,
            apartments: newApartments
        })
    }

    // Here
    // deleteTenant = (tenantId) => {
    //     fetch(`http://127.0.0.1:3001/api/v1/tenants/${tenantId}`, { method: "DELETE" })
    // }

    // Here
    handleRemoveTenant = (e) => {
        const apartment = this.state.apartments.find(apartment => apartment.id === parseInt(e.target.id))
        // console.log("This is checking for the apartment", apartment)
        // console.log("This is checking for the apartment/tenant", apartment.tenant)
        // console.log("This is checking for the apartment/tenant/id", apartment.tenant.id)
        // this.deleteTenant(apartment.tenant.id)
        fetch(`http://127.0.0.1:3001/api/v1/tenants/${apartment.tenant.id}`, { method: "DELETE" })
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

    // Here
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

        fetch(`http://localhost:3001/api/v1/apartments/${apartment.id}`, obj)
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
                                // style={{ width: "475px", height: "313.81px" }}
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
                    {/* <div className="property-detail-metrics-container">
                        <div className="date-purchased-container">
                            <p className="metric-header">Date Purchased</p>
                            <p className="metrics-info">{this.state.property.date_purchased}</p>
                        </div>
                        <div className="purchased-amount-container">
                            <p className="metric-header">Purchase Amount</p>
                            <p className="metrics-info">${this.state.property.purchased_amount}</p>
                        </div>
                        <div className="mortgage-payable-container">
                            <p className="metric-header">Mortgage Payable</p>
                            <p className="metrics-info">${this.state.property.mortgage_payable}</p>
                        </div>
                        <div className="price-per-unit-container">
                            <p className="metric-header">Price Per Unit</p>
                            <p className="metrics-info">${this.state.property.price_per_unit}</p>
                        </div>
                        <div className="revenue-container">
                            <p className="metric-header">Revenue</p>
                            <p className="metrics-info">${this.state.property.revenue}</p>
                        </div>
                        <div className="number-of-units-container">
                            <p className="metric-header">Number of Units</p>
                            <p className="metrics-info">{this.state.property.number_of_units}</p>
                        </div>
                        <div className="occupied-units-container">
                            <p className="metric-header">Occupied of Units</p>
                            <p className="metrics-info">{this.state.property.occupied_units}</p>
                        </div>
                        <div className="cap-rate-container">
                            <p className="metric-header">Cap Rate</p>
                            <p className="metrics-info">{this.state.property.cap_rate}%</p>
                        </div>
                        <div className="property-type-container">
                            <p className="metric-header">Property Type</p>
                            <p className="metrics-info">{this.state.property.property_type}</p>
                        </div>
                        <div className="building-size-container">
                            <p className="metric-header">Building Size</p>
                            <p className="metrics-info">{this.state.property.building_size}</p>
                        </div>
                        <div className="year-built-container">
                            <p className="metric-header">Year Built</p>
                            <p className="metrics-info">{this.state.property.year_built}</p>
                        </div>
                    </div> */}
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
        // console.log("Checking for state", this.state)

        return (
            <div>{this.state.property && this.renderDetails()}</div>
        )
    }
}

// const mapStateToProps = {

// }

export default connect(null, { tooglePropertyModal })(PropertyDetail)