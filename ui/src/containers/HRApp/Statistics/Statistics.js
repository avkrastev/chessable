import React, { Component } from 'react';
import axios from '../../../axios';
import CanvasJSReact from '../../../assets/canvasjs.react';
import Loader from 'react-loader-spinner';
import Department from './Department';
//var CanvasJSReact = require('./canvasjs.react');
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Stastics extends Component {
    state = {
        formData : {
            employees: {
                value: '2',
                valid: true,
                touched: false,
            },
            salary: {
                value: '50000',
                valid: true,
                touched: false,
            }
        },
        loading: false,
        error: false,
        dataPoints: [],
        formValid: true
    }	
    
    componentDidMount () {
        this.setState({loading: true});

        axios.get('/department/getMaxSalary')
            .then( response => {
                const dataPoints = response.data.map((obj) => {
                    obj['label'] = obj['department_name'];
                    obj['y'] = parseInt(obj['salaries_sum']);
                    delete obj['department_name'];
                    delete obj['salaries_sum'];
                    return obj;
                });

                this.setState( { 
                    loading: false, 
                    dataPoints
                });
            })
            .catch( error => {
                this.setState({
                    error: true, 
                    loading: false
                });
            });
    }

    inputChangedHandler = (event, formElement) => {
        const updatedForm = {
            ...this.state.formData
        };
        let isValid = true;

        updatedForm[formElement].value = event.target.value;
        updatedForm[formElement].valid =  updatedForm[formElement].value > 0 && isValid;
        updatedForm[formElement].touched = true;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({formData: updatedForm, formValid: formIsValid});
    }

    showDepartmentsWithHighestSalaries = (event) => {
        event.preventDefault();

        const data = {
            employeesNumber: this.state.formData.employees.value,
            salary: this.state.formData.salary.value
        };

        axios.post('/department/showDepartmentsWithHighestSalaries', data)
            .then( response => {
                this.setState( { 
                    loading: false,
                    formResponse: response.data 
                });
            })
            .catch( error => {
                this.setState({
                    error: true, 
                    loading: false
                });
            });
    }

    render() {
        const options = {
            title: {
            text: "Highest salaries per department"
            },
            data: [{				
                    type: "column",
                    dataPoints: this.state.dataPoints
            }]
        }
        let loading = null;
        if (this.state.loading) {
            loading = <div className="loader"><Loader
                        type="ThreeDots"
                        color="#28a745"
                        height={100}
                        width={100}                
                    /></div>
        }

        let formResponse = null;
        if (this.state.formResponse) {
            if (Object.keys(this.state.formResponse).length > 0) {
                formResponse = this.state.formResponse.map( resp => {
                    return (
                        <div className="col-sm-3" key={resp.id}>
                            <div className="card-group mt-5">
                                <Department
                                    name={resp.name}
                                    description={resp.description} />
                            </div>
                        </div>
                    );
                });
            } else {
                formResponse = <div className="text-center">No results found!</div>;
            }
        }

        return (
            <div className="container mt-5">
                {loading}
                <CanvasJSChart options = {options}
                    /* onRef = {ref => this.chart = ref} */
                />
                <br/><br/>
                <form>
                    <div className="form-row align-items-center">
                        <div className="col-sm-5">
                            <h5>List just those departments that have more than </h5>
                        </div>
                        <div className="col-sm-1">                       
                            <input 
                                type="number" 
                                className="form-control mb-2 text-right" 
                                value={this.state.formData.employees.value} 
                                onChange={( event ) => this.inputChangedHandler(event, 'employees')}
                            />
                        </div>
                        <div className="col-sm-3">
                            <h5>employees that earn over</h5>
                        </div>
                            <div className="col-sm-2">
                            <input 
                                type="number" 
                                className="form-control mb-2 text-right" 
                                value={this.state.formData.salary.value} 
                                onChange={( event ) => this.inputChangedHandler(event, 'salary')}/>
                        </div>
                        <div className="col-1">
                            <button 
                                type="submit" 
                                className="btn btn-success mb-2" 
                                disabled={!this.state.formValid}
                                onClick={(event) => this.showDepartmentsWithHighestSalaries(event)}>
                                    Show
                            </button>
                        </div>
                    </div>
                </form>
                <div className="container">
                    <div className="row">  
                        {formResponse}
                    </div>
                </div>
            </div>
        );
    }
}

export default Stastics;