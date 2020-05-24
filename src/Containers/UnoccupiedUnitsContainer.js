import React from "react"
import { connect } from "react-redux"
import { getUnoccupiedUnits, toogleModal } from "../actions"
import ModalExampleDimmer from "../Components/Modal"
import { Table } from 'semantic-ui-react'

class UnoccupiedUnitsContainer extends React.Component {

    state = {
        apartmentPressed: null,
        newUnoccupiedList: []
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.currentUser !== prevProps.currentUser) {
            const ownerId = this.props.currentUser.id

            fetch(`https://cader-api.herokuapp.com/api/v1/unoccupied_units/${ownerId}`)
                .then(response => response.json())
                .then(data => this.props.getUnoccupiedUnits(data))
        } else if (prevProps.unoccupiedUnits !== this.props.unoccupiedUnits) {

        }
    }

    componentDidMount() {
        if (this.props.currentUser) {
            const ownerId = this.props.currentUser.id

            fetch(`https://cader-api.herokuapp.com/api/v1/unoccupied_units/${ownerId}`)
                .then(response => response.json())
                .then(data => this.props.getUnoccupiedUnits(data))
        }
    }

    renderToogleModal = (e) => {
        this.setState({ apartmentPressed: e.target.value })
        this.props.toogleModal(true)
    }

    renderTableData = () => {
        return this.props.unoccupiedUnits.map(unit => {
            return (
                <Table.Row>
                    <Table.Cell>{unit.name}</Table.Cell>
                    <Table.Cell>{`${unit.property.address} ${unit.property.city}, ${unit.property.state} ${unit.property.country} ${unit.property.zip_code}`}</Table.Cell>
                    <Table.Cell>${unit.property.price_per_unit}</Table.Cell>
                    <Table.Cell style={{width: "10px"}}>
                        <button
                            onClick={(e) => this.renderToogleModal(e)}
                            value={unit.id}
                            style={{ "font-size": "12px", width: "132px", height: "34px", "background-color": "#282828", color: "#fff" }}
                        >
                            Add a Tenanat
                        </button>
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    resetApartmentState = () => {
        this.setState({
            apartmentPressed: null
        })
    }

    render() {

        return (
            <div className="unoccupied-units-container" >
                <h1 style={{"margin-left": "193px"}}>Unoccupied Units</h1>
                <Table className="unoccupied-units-table" celled striped 
                style={{ width: "80%", margin: "auto" }}>
                    <Table.Body>
                        <Table.Row>
                            <Table.HeaderCell style={{height: "50px", "padding-left": "11px"}}>Unit</Table.HeaderCell>
                            <Table.HeaderCell style={{height: "50px", "padding-left": "11px"}}>Location</Table.HeaderCell>
                            <Table.HeaderCell style={{height: "50px", "padding-left": "11px"}}>Rent Price</Table.HeaderCell>
                        </Table.Row>
                        {this.renderTableData()}
                    </Table.Body>
                </Table>
                <div className="unoccupied-units-modal">
                    <ModalExampleDimmer
                        apartmentPressed={this.state.apartmentPressed}
                        resetApartmentState={this.resetApartmentState}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        unoccupiedUnits: state.unoccupiedUnits,
        modalToogle: state.modalToogle,
        modalDimmer: state.modalDimmer
    }
}

export default connect(mapStateToProps, { getUnoccupiedUnits, toogleModal })(UnoccupiedUnitsContainer)