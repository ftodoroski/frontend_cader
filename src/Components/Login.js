import  React  from "react";
import { connect } from 'react-redux'
import { handleChange, handleSignupLogin, resetLoginInput } from '../actions'
import history from '../history'


class Login extends React.Component {

    state = {
        loginUserError: false
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const obj = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                email: this.props.email,
                password: this.props.password,
            })
        }

        fetch('http://127.0.0.1:3001/api/v1/login', obj).then(response => response.json()).then(response => {
            if (response["owner"]) {
                localStorage.token = response.token
                this.props.handleSignupLogin(response)
                history.push('/properties')
                this.setState({ loginUserError: false })
            } else {    
                this.props.resetLoginInput()
                this.setState({ loginUserError: true })
            }
        })
    }

    

    render() {
        // console.log(this.props)
        return (
            <div className="login-container">
                <form onSubmit={this.handleSubmit} className="login-form">
                    <label id="email-label">Email</label>
                    <input 
                        name="email" 
                        onChange={(e) => this.props.handleChange(e)} 
                        className="login" 
                        value={this.props.email} 
                        id="email-input" 
                        style={this.state.loginUserError ? { border: "1px solid #FF0000" } : null} 
                        placeholder={this.state.loginUserError ? "Please try again" : null}
                    />
                    
                    <label id="password-label">Password</label>
                    <input 
                        name="password" 
                        onChange={(e) => this.props.handleChange(e)} 
                        className="login" 
                        type="password" 
                        value={this.props.password} 
                        id="password-input"
                        style={this.state.loginUserError ? { border: "1px solid #FF0000" } : null}
                        placeholder={this.state.loginUserError ? "Please try again" : null}
                    />

                    <button type="submit" id="login-button">Log In</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.login.email, 
        password: state.login.password,
        currentUser: state.currentUser
    }
}

const mapDispatchToState = {
    handleChange, 
    handleSignupLogin, 
    resetLoginInput
}

export default connect(mapStateToProps, mapDispatchToState) (Login)
