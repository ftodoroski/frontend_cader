import React from 'react'
import { Button, Modal, Form} from 'semantic-ui-react'
import { connect } from "react-redux"
import { tooglePropertyModal } from "../actions"
import AddTenantIcon from "./AddTenantIcon"
import history from '../history'

class PropertyDetailModal extends React.Component {
    state = {
        name: "",
        password: "",
        email: "",
        phone_number: "",
        apartment_id: null
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.apartmentPressed !== this.props.apartmentPressed) {
            this.setState({
                apartment_id: this.props.apartmentPressed.id
            })
            // console.log("Inside the componentDidUpdate", "- checking for apartmentPressed",this.props.apartmentPressed)
        } 
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state))
    }

    // Here - This one
    AddTenant = (tenantInfo) => {
        const obj = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tenantInfo)
        }

        fetch("http://localhost:3001/api/v1/tenants", obj)
            .then(response => response.json())
            .then(data => {
                console.log("Successfully Added to Tenants", data)
                this.props.handleApartmentsAddRender(data, this.props.apartmentPressed, this.getTodaysDate())
            })
            .catch(error => console.log("Error", error))
    }

    getTodaysDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        return mm + '/' + dd + '/' + yyyy;
    }

    // Here - This one
    chanageApartmentStatus = () => {
        const apartment = this.props.apartmentPressed.id
    
        const payload = {
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

        fetch(`http://localhost:3001/api/v1/apartments/${apartment}`, obj)
            .then(response => response.json())
            .then(data => {
                console.log("Successfully updated", data)
            })
            .catch(error => console.log("Error", error))
    }
    
    // Here - This one
    handleSubmit = (e) => {
        e.preventDefault()
        const tenantInfo = {
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
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
        this.props.tooglePropertyModal(false)
    }


    render() {   

        return (
            <div>
                <Modal dimmer={'blurring'}
                    open={this.props.modalPropertyToogle}
                    onClose={() => this.props.tooglePropertyModal(false)}
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
                                <Button color="black" type='submit' >Submit</Button>
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
        modalPropertyToogle: state.modalPropertyToogle,
        modalPropertyDimmer: state.modalPropertyDimmer
    }
}

export default connect(mapStateToProps, { tooglePropertyModal }) (PropertyDetailModal)