import React, { Component } from 'react';
// import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './HRApp.css';
import Departments from './Departments/Departments';
import NewDepartment from './Departments/NewDepartment';
import Employees from './Employees/Employees';
import NewEmployee from './Employees/NewEmployee';
import Statistics from './Statistics/Statistics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';

class HRApp extends Component {
    render () {
        return (
            <div className="HRApp">
                <header>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <NavLink className="navbar-brand" to="/" exact>
                            HRApp
                        </NavLink>
                        <button 
                            className="navbar-toggler" 
                            type="button" 
                            data-toggle="collapse" 
                            data-target="#navbarNavAltMarkup" 
                            aria-controls="navbarNavAltMarkup"  
                            aria-expanded="false" 
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                            <NavLink className="nav-item nav-link" to="/departments">
                                <FontAwesomeIcon icon={faBuilding} /> Departments <span className="sr-only">(current)</span>
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/employees">
                                <FontAwesomeIcon icon={faUsers} /> Employees
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/statistics">
                                <FontAwesomeIcon icon={faChartBar} /> Statistics
                            </NavLink>
                            </div>
                        </div>
                    </nav>
                </header>
                <Switch>
                    <Route path="/departments" component={Departments} />
                    <Route path="/employees" component={Employees} />
                    <Route path="/statistics" component={Statistics} />
                    <Route path="/new-department" component={NewDepartment} />
                    <Route path="/new-employee" component={NewEmployee} />
                    <Redirect from="/" to="/departments" exact />
                    <Route render={() => <h1 className="text-center">Page Not found!</h1>}/>
                </Switch>
            </div>
        );
    }
}

export default HRApp;