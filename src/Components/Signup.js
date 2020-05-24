import React from 'react'
import { connect } from 'react-redux'
import { handleChange, handleSignupLogin } from '../actions'


class Signup extends React.Component {

    handleSubmit = (e)  => {
        e.preventDefault()

        const obj = {
            method: 'POST', 
            headers: {
                'content-type': 'application/json', 
                accept: 'application/json'
            }, 
            body: JSON.stringify({
                name: this.props.name, 
                email: this.props.email, 
                password: this.props.password, 
                phone_number: this.props.phone_number
            })
        }

        fetch('https://cader-api.herokuapp.com/api/v1/owners', obj).then(response => response.json()).then(response => {
            localStorage.token = response.token
            this.props.handleSignupLogin(response)
            this.props.history.push('/properties')
        })
    }

    render() {
        return (
            <div>
                <h1 className="signup-h1">Sign Up</h1>
                <h2 className="signup-h2">It's quick and easy.</h2>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Full name" name="name" className="signup-inputs" onChange={(e) => this.props.handleChange(e)}/>
                    <input placeholder="Email" name="email" className="signup-inputs" onChange={(e) => this.props.handleChange(e)}/>
                    <input placeholder="New password" name="password" className="signup-inputs" onChange={(e) => this.props.handleChange(e)} type="password"/>
                    <input placeholder="Phone number" name="phone_number" className="signup-inputs" onChange={(e) => this.props.handleChange(e)}/>
                    <button className="signup-button">Sign Up</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.signup.name, 
        email: state.signup.email, 
        password: state.signup.password, 
        phone_number: state.signup.phone_number
    }
}

const mapDispatchToState = {
    handleChange,
    handleSignupLogin
}

export default connect(mapStateToProps, mapDispatchToState) (Signup)
