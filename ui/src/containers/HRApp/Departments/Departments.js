import React, { Component } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import Deparment from './Department/Department';
import Loader from 'react-loader-spinner'
import ModalConfirmDelete from '../../../components/Modal/Confirm';

class Subscribers extends Component {
    state = {
        departments: [],
        error: false,
        loading: false,
        modalIsOpen: false,
        modal: '',
        errorResponse: '',
    }

    componentDidMount () {
        this.setState({loading: true});

        axios.get('/departments' + this.props.location.search)
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

        Modal.setAppElement('body');
    }

    openModal(id, action) {
        this.setState( { 
            departmentId: id,
            modalIsOpen: true,
            modal: action 
        });
    }

    deleteDepartment() {
        this.setState({loading: true});
        axios.delete('/departments/' + this.state.departmentId)
            .then( response => {  
                const updatedDepartments = [
                    ...this.state.departments
                ];   
                
                const filteredDepartments = updatedDepartments.filter(department => {
                    return parseInt(department.id) !== parseInt(this.state.departmentId)
                });

                this.setState( { 
                    departments: filteredDepartments,
                    modalIsOpen: false,
                    loading: false,
                });
            })
            .catch( error => {
                let errorResponse = '';
                if (error.response) {
                    errorResponse = error.response.data.error
                }

                this.setState({
                    loading: false,
                    errorResponse,
                    modalIsOpen: false,
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
                    confirmDelete={this.deleteDepartment.bind(this)}
                    close={this.closeModal.bind(this)}
                />
            );
        }

        let alert = null;
        if (this.state.errorResponse !== '') {
            alert = (
                <div className="alert alert-danger mt-5" role="alert">
                    {this.state.errorResponse}
                </div>
            );
        }

        let department = null;
        if (Object.keys(this.state.departments).length > 0) {
            department = this.state.departments.map( department => (
                <Deparment
                    key={department.id}
                    name={department.name}
                    description={department.description}                        
                    delete={() => this.openModal(department.id, 'delete')} />
            ))
        }

        if (!this.state.error) {
            return (
                <div className="container">
                    {alert}
                    {loader}
                    <Link className="btn btn-success float-right new-department" to="/new-department">+ New Department</Link>
                    <div className="departments">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Description
                                    </th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {department}
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

export default Subscribers;