import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchValid } from './../redux/actions/order'

import FormOrder from './../components/FormOrder';
import TableOrder from './../components/TableOrder';

export class Order extends Component {

    constructor(props){
        super(props);
        props.fetchValid();
    }

    componentDidMount(){
        if(this.props.storage){
            
        }
    }

    render() {
        return (
            <div>
                <h2>Orders</h2>
                <FormOrder />
                <br />
                <br />
                <div className="row">
                    <div className="col-12">
                        <TableOrder />
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        storage: state.order.storage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchValid: () => dispatch(fetchValid())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
