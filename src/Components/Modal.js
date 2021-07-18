import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import { connect } from "react-redux"
import { toogleModal, getUnoccupiedUnits } from "../actions"
import AddTenantIcon from "./AddTenantIcon"


class ModalExampleDimmer extends Component {
    state = {
        name: "",
        password: "",
        email: "",
        phone_number: "",
        apartment_id: null
    }

    componentDidUpdate(prevProps) {
        if (prevProps.apartmentPressed !== this.props.apartmentPressed) {
            this.setState({ 
                apartment_id: this.props.apartmentPressed
            })
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value}, () => console.log(this.state))
    }

    AddTenant = (tenantInfo) => {
        const obj = {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(tenantInfo)
        }

        fetch("https://cader-api.herokuapp.com/api/v1/tenants", obj)
        .then(response => response.json())
        .then(data => console.log("Successfully Added to Tenants", data))
        .catch(error => console.log("Error", error))
    }
    
    getTodaysDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();
        
        return mm + '/' + dd + '/' + yyyy;
    }
    
    chanageApartmentStatus = () => {
        const apartment = this.props.apartmentPressed
        const payload  = {
            occupied: true, 
            move_in_date: this.getTodaysDate()
        }
        
        const obj = {
            method: "PATCH", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(payload)
        }
        
        fetch(`https://cader-api.herokuapp.com/api/v1/apartments/${apartment}`, obj)
        .then(response => response.json())
        .then(data => {
            
            const newList = this.props.unoccupiedUnits.filter(units => {
                return units.id !== data.id
            })
            console.log("Successfully updated", data, newList)
            this.props.getUnoccupiedUnits(newList)
        })
        .catch(error => console.log("Error", error))
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        const tenantInfo = { 
            ...this.state, 
            phone_number: parseInt(this.state.phone_number),
            apartment_id: parseInt(this.state.apartment_id)
        }

        this.chanageApartmentStatus()
        this.AddTenant(tenantInfo)
        this.setState({
            name: "",
            password: "",
            email: "",
            phone_number: "",
            apartment_id: null
        })
        this.props.toogleModal(false)
    }

    handleToogleModal = () => {
        this.props.toogleModal(false)
        this.props.resetApartmentState()
    }

    render() {
    
        return (
            <div>
                <Modal dimmer={'blurring'}
                     open={this.props.modalToogle}
                    onClose={this.handleToogleModal}
                >
                    <Modal.Header>Add a Tenant to this Unit</Modal.Header>
                    <Modal.Content image>
                        <AddTenantIcon />
                        <Modal.Description>
                            <Form onSubmit={(e) => this.handleSubmit(e)}>
                                <Form.Field>
                                    <label>Full Name</label>
                                    <input 
                                        placeholder='Full Name' 
                                        name="name" 
                                        onChange={(e) => this.handleChange(e)}
                                        value={this.state.name}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Email</label>
                                    <input 
                                        placeholder='Email' 
                                        name="email" 
                                        onChange={(e) => this.handleChange(e)} 
                                        value={this.state.email}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input 
                                        placeholder='Password' 
                                        name="password" 
                                        onChange={(e) => this.handleChange(e)} 
                                        type="password" 
                                        value={this.state.password}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Phone Number</label>
                                    <input 
                                        placeholder='Phone Number' 
                                        name="phone_number" 
                                        onChange={(e) => this.handleChange(e)} 
                                        value={this.state.phone_number}
                                    />
                                </Form.Field>
                                <Button color="black" type='submit'>Submit</Button>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modalToogle: state.modalToogle,
        modalDimmer: state.modalDimmer, 
        unoccupiedUnits: state.unoccupiedUnits
    }
}

export default connect(mapStateToProps, { toogleModal, getUnoccupiedUnits }) (ModalExampleDimmer)