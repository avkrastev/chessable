import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

class Subscriber extends Component {

    render() {
        return (
            <tr>
                <td>
                    {this.props.name}
                </td>
                <td>
                    {this.props.description}
                </td>
                <td className="text-right">
                    <button type="button" className="btn btn-danger" onClick={this.props.delete}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </td>
            </tr>
        );
    }
}

export default Subscriber;