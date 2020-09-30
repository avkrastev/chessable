import React, { Component } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import Employee from './Employee/Employee';
import Loader from 'react-loader-spinner'
import ModalConfirmDelete from '../../../components/Modal/Confirm';

class Employees extends Component {
    state = {
        employees: [],
        error: false,
        loading: false,
        modalIsOpen: false,
        modal: '',
        errorResponse: '',
    }

    componentDidMount () {
        this.setState({loading: true});

        axios.get('/employees' + this.props.location.search)
            .then( response => {
                this.setState( { 
                    loading: false, 
                    employees: response.data,
                });
            })
            .catch( error => {
                this.setState({
                    error: true, 
                    loading: false
                });
            });

        Modal.setAppElement('body');
    }

    openModal(id, action) {
        this.setState({modalIsOpen: true, modal: action, employeeId: id });
    }

    deleteEmployee() {
        this.setState({loading: true});
        axios.delete('/employees/' + this.state.employeeId)
            .then( response => {  
                const updatedEmployees = [
                    ...this.state.employees
                ];   
                
                const filteredEmployees = updatedEmployees.filter((employee) => {
                    return parseInt(employee.id) !== parseInt(this.state.employeeId)
                });

                this.setState( { 
                    employees: filteredEmployees,
                    modalIsOpen: false,
                    loading: false,
                });
            })
            .catch( error => {
                this.setState({
                    error: true, 
                    loading: false,
                });
            });
    }
     
    closeModal() {
        this.setState({modalIsOpen: false, errorResponse: ''});
    }

    render () {
        let loader = null;
        if (this.state.loading) {
            loader = <div className="loader"><Loader
                        type="ThreeDots"
                        color="#28a745"
                        height={100}
                        width={100}                
                    /></div>
        }
        let modal = null;
        if (this.state.modal === 'delete') {
            modal = (
                <ModalConfirmDelete
                    confirmDelete={this.deleteEmployee.bind(this)}
                    close={this.closeModal.bind(this)}
                />
            );
        }

        if (!this.state.error) {
            return (
                <div className="container">
                    {loader}
                    <Link className="btn btn-success float-right new-employee" to="/new-employee">+ New Employee</Link>
                    <div className="departments">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Department
                                    </th>
                                    <th>
                                        Salary
                                    </th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.employees.map( employee => (
                                    <Employee
                                        key={employee.id}
                                        name={employee.first_name +' '+ employee.last_name}
                                        department={employee.department} 
                                        salary={employee.salary}                      
                                        edit={() => this.openModal(employee.id, 'edit')}
                                        delete={() => this.openModal(employee.id, 'delete')} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal.bind(this)}
                        style={{
                            content : {
                                top                   : '50%',
                                left                  : '50%',
                                right                 : 'auto',
                                bottom                : 'auto',
                                marginRight           : '-50%',
                                transform             : 'translate(-50%, -50%)',
                                width                 : '30%'
                            }
                        }}
                    >     
                        {modal}
                    </Modal>
                </div>   
            );
        }

        return (
            <div>
                <div className="container">
                    <h2 className="text-center">Something went wrong!</h2>
                </div>
            </div>
        );
    }
}

export default Employees;