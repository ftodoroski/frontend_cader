import React from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from './Containers/NavBar'
import PropertiesContainer from './Containers/PropertiesContainer'
import UnoccupiedUnitsContainer from './Containers/UnoccupiedUnitsContainer'
import PropertyDetail from './Components/PropertyDetail'
import Auth from './Containers/Auth'
import { autoLogin } from './actions'
import history from './history'
import "./styles.css"


class App extends React.Component {
  

  fetchTokenUser = (token) => {
    const obj = {
      headers: {
        Authorization: token
      }
    }

    fetch('http://127.0.0.1:3001/api/v1/auto_login', obj)
    .then(response => response.json())
    .then(response => {
       this.props.autoLogin(response)
    })
  }

  componentDidMount () {
    const token = localStorage.token

    if (token) {
      this.fetchTokenUser(token)
    } else {
      history.push('/')
    }
  }

  render() {
    return (
        <div className="App">
          <NavBar />
          <div className="app-body">
            <Switch>
              <Route exact path="/" component={Auth} />
              <Route exact path="/properties" component={PropertiesContainer} />
              <Route exact path="/properties/:id" component={PropertyDetail} />
              <Route exact path="/unoccupied-units" component={UnoccupiedUnitsContainer} />
            </Switch>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps, { autoLogin }) (App);

