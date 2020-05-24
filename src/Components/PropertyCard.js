import React from 'react'
import history from '../history'
import { tooglePropertiesModal } from "../actions"
import { connect } from "react-redux"

class PropertyCard extends React.Component {

    componentDidMount() {
        const propertyId = this.props.property.id
        const revenue = (this.props.property.occupied_units) * (this.props.property.price_per_unit)

        const obj = {
            method: "PATCH", 
            headers: {
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({revenue: revenue})
        }

        fetch(`https://cader-api.herokuapp.com/api/v1/properties/${propertyId}`, obj)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error))
    }

    monthyIncome = () => {
        const occupiedUnits = this.props.property.occupied_units
        const pricePerUnit = this.props.property.price_per_unit

        return occupiedUnits * pricePerUnit
    }

    render() {

        return (
            <div className="property-card-container">
                <div className="property-card" onClick={() => history.push(`/properties/${this.props.property.id}`)}>
                    <div className="property-card-image">
                        <img src={this.props.property.images[0]} style={{width: "222px",  height: "170px"}} alt="House"/>
                    </div>
                    <div className="property-card-address">
                        <div className="property-card-street">
                            <strong style={{"font-size": "17px"}}>{this.props.property.address}</strong>
                        </div>
                        <div className="property-card-city-state-zip">
                            {this.props.property.city}, {this.props.property.state} {this.props.property.zip_code}
                        </div>
                    </div>
                    <br />
                    <div className="property-card-info">
                        <table className="property-card-table">
                            <tbody className="property-card-table-body">
                                <tr className="property-card-table-row">
                                    <th className="property-card-table-header">Occupied Units</th>
                                    <td className="property-card-table-data">{this.props.property.occupied_units} out of {this.props.property.number_of_units}</td>
                                </tr>
                                <tr>
                                    <th className="property-card-table-header">Monthly Rental Income</th>
                                    <td className="property-card-table-data">${this.monthyIncome()}</td>
                                </tr>
                                <tr>
                                    <th className="property-card-table-header">Mortgage Payable</th>
                                    <td className="property-card-table-data">${this.props.property.mortgage_payable}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                    <div className="add-new-tenant-button">
                        <button onClick={() => {
                            this.props.tooglePropertiesModal(true)
                            this.props.handlePropertyPressed(this.props.property.id)
                        }}
                            style = {{ "font-size": "12px", width: "132px", height: "34px", "background-color": "#282828", color: "#fff"}}
                        >
                            Add a New Tenant
                        </button>
                    </div>
            </div>
        )
    }
}



export default connect(null, { tooglePropertiesModal }) (PropertyCard)