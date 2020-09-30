import React from 'react';

const department = (props) => (
    <div className="card" >
        <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text">{props.description} </p>
        </div>
    </div>
);

export default department;
