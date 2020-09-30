import React, { Component } from 'react';
import axios from '../../../axios';
import { Redirect } from 'react-router-dom';

import Loader from 'react-loader-spinner';

class NewEmployee extends Component {
    state = {
        formData : {
            firstName: {
                value: '',
                valid: false,
                touched: false,
                errorText: 'The first name is required!'
            },
            lastName: {
                value: '',
                valid: false,
                touched: false,
                errorText: 'The last name is required!'
            },
            salary: {
                value: '',
                valid: false,
                touched: false,
                errorText: 'Please enter valid amount!'
            },
            department: {
                value: '0',
                valid: false,
                touched: false
            },
        },
        loading: false,
        submitted: false,
        formValid: false,
        errorResponse: '',
        departments: []
    }

    componentDidMount () {
        this.setState({loading: true});

        axios.get('/departments')
            .then( response => {
                this.setState( { 
                    loading: false, 
                    departments: response.data,
                });
            })
            .catch( error => {
                this.setState({
                    error: true, 
                    loading: false
                });
            });
    }

    employeeDataHandler = () => {
        this.setState({loading: true});

        const data = {
            first_name: this.state.formData.firstName.value,
            last_name: this.state.formData.lastName.value,
            department_id: this.state.formData.department.value,
            salary: this.state.formData.salary.value
        };

        axios.post( '/employees', data )
            .then( response => {
                this.setState({
                    loading: false,
                    submitted: true
                });
                this.props.history.replace('/employees');
            })
            .catch( error => {
                let errorResponse = '';
                if (error.response) {
                    errorResponse = error.response.data.error
                }
                this.setState( { loading: false, errorResponse } );
            });
    }

    inputChangedHandler = (event, formElement) => {
        const updatedForm = {
            ...this.state.formData
        };

        updatedForm[formElement].value = event.target.value;
        updatedForm[formElement].valid = this.checkValidity(formElement, updatedForm[formElement].value);
        updatedForm[formElement].touched = true;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({formData: updatedForm, formValid: formIsValid, errorResponse: ''});
    }

    checkValidity(element, value) {
        let isValid = true;

        switch(element) {
            case 'firstName':
            case 'lastName':
                isValid = value.trim() !== '' && isValid;
                break;
            case 'salary':
                isValid = value > 0 && isValid;
                break;
            case 'department':
                isValid = value !== '0' && isValid;
                break
            default:
                isValid = true;
        }

        return isValid;
    }

    render () {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="/employees" />;
        }

        const departments = this.state.departments.map(department => {
            return <option key={department.id} value={department.id}>{department.name}</option>;
        });

        let form = (
            <form >
                {redirect}
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text"    
                        className={this.state.formData.firstName.valid || !this.state.formData.firstName.touched ? "form-control" : "form-control is-invalid" }
                        id="firstName" 
                        value={this.state.formData.firstName.value} 
                        onChange={( event ) => this.inputChangedHandler(event, 'firstName')}/>
                    <div className="invalid-feedback">
                        {this.state.formData.firstName.errorText} 
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text"    
                        className={this.state.formData.lastName.valid || !this.state.formData.lastName.touched ? "form-control" : "form-control is-invalid" }
                        id="lastName" 
                        value={this.state.formData.lastName.value} 
                        onChange={( event ) => this.inputChangedHandler(event, 'lastName')}/>
                    <div className="invalid-feedback">
                        {this.state.formData.lastName.errorText} 
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <select 
                        className="form-control" 
                        id="department"
                        value={this.state.formData.department.value} 
                        onChange={( event ) => this.inputChangedHandler(event, 'department')}>
                            <option value="0"></option>
                            {departments}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary</label>
                    <input 
                        type="number"    
                        className={this.state.formData.salary.valid || !this.state.formData.salary.touched ? "form-control" : "form-control is-invalid" }
                        id="salary" 
                        value={this.state.formData.salary.value} 
                        onChange={( event ) => this.inputChangedHandler(event, 'salary')}/>
                    <div className="invalid-feedback">
                        {this.state.formData.salary.errorText} 
                    </div>
                </div>
                <div className="text-center">
                    <button type="button" onClick={this.employeeDataHandler} disabled={!this.state.formValid} className="btn btn-success">Add Employee</button>
                </div>
            </form>
        );

        if (this.state.loading) {
            form = <div className="loader"><Loader
                        type="ThreeDots"
                        color="#28a745"
                        height={100}
                        width={100}                
                    /></div>
        }

        let alert = null;
        if (this.state.errorResponse !== '') {
            alert = <div className="alert alert-danger" role="alert">{this.state.errorResponse}</div>
        }
        return (
            <div className="newRecord">
                {alert}
                {form}
            </div>
        ); 
    }
}

export default NewEmployee;