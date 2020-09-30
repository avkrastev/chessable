import React, { Component } from 'react';
import axios from '../../../axios';
import { Redirect } from 'react-router-dom';

import Loader from 'react-loader-spinner';

class NewDepartment extends Component {
    state = {
        formData : {
            name: {
                value: '',
                valid: false,
                touched: false,
                errorText: 'The name is required!'
            },
            description: {
                value: '',
                valid: true,
                touched: false,
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

    departmentDataHandler = () => {
        this.setState({loading: true});

        const data = {
            name: this.state.formData.name.value,
            description: this.state.formData.description.value,
        };

        axios.post( '/departments', data )
            .then( response => {
                this.setState({
                    loading: false,
                    submitted: true
                });
                this.props.history.replace('/departments');
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
            case 'name':
                isValid = value.trim() !== '' && isValid;
                break;
            default:
                isValid = true;
        }

        return isValid;
    }

    render () {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="/departments" />;
        }

        let form = (
            <form >
                {redirect}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text"    
                        className={this.state.formData.name.valid || !this.state.formData.name.touched ? "form-control" : "form-control is-invalid" }
                        id="name" 
                        value={this.state.formData.name.value} 
                        onChange={( event ) => this.inputChangedHandler(event, 'name')}/>
                    <div className="invalid-feedback">
                        {this.state.formData.name.errorText} 
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        rows="3" 
                        value={this.state.formData.description.value} 
                        onChange={( event ) => this.inputChangedHandler(event, 'description')}>
                    </textarea>
                </div>
                <div className="text-center">
                    <button type="button" onClick={this.departmentDataHandler} disabled={!this.state.formValid} className="btn btn-success">Add Department</button>
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

export default NewDepartment;