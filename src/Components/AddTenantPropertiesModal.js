import React from 'react'
import { Button, Modal, Form} from 'semantic-ui-react'
import { connect } from "react-redux"
import { tooglePropertiesModal } from "../actions"
import AddTenantIcon from "./AddTenantIcon"

class AddTenantPropertyModal extends React.Component {
    state = {
        name: "",
        password: "",
        email: "",
        phone_number: "",
        apartment_id: null, 
        propertyUnoccupiedUnits: []
    }

    componentDidUpdate(prevProps) {
        if (prevProps.propertyPressed !== this.props.propertyPressed) {
            fetch(`https://cader-api.herokuapp.com/api/v1/unoccupied_property_units/${this.props.propertyPressed}`)
            .then(response => response.json())
            .then(data => {
                this.setState({propertyUnoccupiedUnits: data})
            })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state))
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
        const apartment = this.state.apartment_id
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

        fetch(`https://cader-api.herokuapp.com/api/v1/apartments/${apartment}`, obj)
            .then(response => response.json())
            .then(data => {
                console.log("Successfully updated", data)
            })
            .catch(error => console.log("Error", error))
    }
    // May need to increase occupied units in the property model

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
        this.props.tooglePropertiesModal(false)
    }


    render() {
        // console.log(this.state)

        return (
            <div>
                <Modal dimmer={'blurring'}
                    open={this.props.modalPropertiesToogle}
                    onClose={() => this.props.tooglePropertiesModal(false)}
                >
                    <Modal.Header>Add a Tenant to this Unit</Modal.Header>
                    <Modal.Content image>
                        <AddTenantIcon />
                        <Modal.Description>
                            <Form onSubmit={(e) => this.handleSubmit(e)}>
                                <Form.Field>
                                    <label>Available Units</label>
                                    {this.state.propertyUnoccupiedUnits.length === 0 ? <input placeholder="No Available Units" disabled />
                                    :
                                    <select 
                                        placeholder='Available Units' 
                                        options={this.state.propertyUnoccupiedUnits.name} 
                                        name="apartment_id" 
                                        onChange={(e) => this.handleChange(e)}
                                        defaultValue={this.state.propertyUnoccupiedUnits[0]}
                                    >
                                            {this.state.propertyUnoccupiedUnits.map(unit => {
                                                return <option value={unit.id}>{unit.name}</option>
                                            })}
                                    </select> 
                                    }
                                </Form.Field>
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
                                <Button color="black" type='submit' disabled={this.state.propertyUnoccupiedUnits.length === 0 ? true : false}>Submit</Button>
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
        modalPropertiesToogle: state.modalPropertiesToogle,
        modalPropertiesDimmer: state.modalPropertiesDimmer
    }
}

export default connect(mapStateToProps, { tooglePropertiesModal })(AddTenantPropertyModal)