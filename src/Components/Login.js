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

        fetch('https://cader-api.herokuapp.com/api/v1/login', obj).then(response => response.json()).then(response => {
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

    handleDemo = (e) => {
        e.preventDefault()

        const obj = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                email: "demoEmail@gmail.com",
                password: "0000",
            })
        }

        fetch('https://cader-api.herokuapp.com/api/v1/login', obj).then(response => response.json()).then(response => {
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

                    <button type="submit" className="login-button" id="left-login-button">Log In</button>
                    <button className="login-button" id="right-login-button" onClick={this.handleDemo}>Demo</button>
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
