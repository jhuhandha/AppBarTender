import React, { Component } from 'react';
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import { fetchValid, fetchClear } from './../redux/actions/order'

import FormOrder from './../components/FormOrder';
import TableOrder from './../components/TableOrder';
import ModalTipDrink from './../components/ModalTipDrink';

export class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showDiscard: false,
            total: 0,
            modal: false
        }

    }

    componentDidMount() {
        this.props.fetchValid();
        setTimeout(() => {
            if (this.props.storage) {
                this.setState({ show: true });
            }
        }, 1000)
    }
    
    componentDidUpdate(){
        if(this.props.payload){
            this.props.history.push("/order/result");
        }
    }
    
    toggle = () => this.setState({modal:!this.state.modal})

    render() {
        return (
            <div>
                <SweetAlert
                    show={this.state.show}
                    warning
                    showCancel
                    confirmBtnText="Yes"
                    cancelBtnText="No"
                    confirmBtnBsStyle="success"
                    title="!Espera!"
                    onConfirm={() => { this.setState({ show: false }) }}
                    onCancel={() => { this.props.fetchClear(); this.setState({ show: false }) }}
                >
                    Hay una orden almacenada de forma temporal, ¿desea continuar con ella?
                </SweetAlert>

                <SweetAlert
                    show={this.state.showDiscard}
                    warning
                    showCancel
                    confirmBtnText="Yes"
                    cancelBtnText="No"
                    confirmBtnBsStyle="success"
                    title="!!"
                    onConfirm={() => { this.props.fetchClear(); this.setState({ showDiscard: false }) }}
                    onCancel={() => { this.setState({ showDiscard: false }) }}
                >
                    ¿Are you sure you want to discard this order?
                </SweetAlert>

                <h2>Orders</h2>
                <FormOrder />
                <br />
                <br />
                <div className="row">
                    <div className="col-12">
                        <TableOrder />
                    </div>
                </div>
                <br />
                <div className="row justify-content-between">
                    <div className="col-6 col-md-4">
                        <button disabled={this.props.drinks_order && this.props.drinks_order.length > 0 ? false : true} type="button" onClick={() => this.setState({ showDiscard: true })} className="btn btn-dark btn-block">Discard Order</button>
                    </div>
                    <div className="col-6 col-md-6">
                        <button disabled={this.props.drinks_order && this.props.drinks_order.length > 0 ? false : true} type="button" onClick={() => this.setState({ modal: true, total: this.props.drinks_order ? this.props.drinks_order.map(e => e.subtotal).reduce((a, v) => { return a + v }) : 0 })} className="btn btn-success btn-block">Finish Order</button>
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop='static'>
                    <ModalHeader toggle={this.toggle}>Tip</ModalHeader>
                    <ModalBody>
                        <ModalTipDrink total={this.state.total} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        storage: state.order.storage,
        drinks_order: state.order.order_drink,
        payload: state.order.payload,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchValid: () => dispatch(fetchValid()),
        fetchClear: () => dispatch(fetchClear()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order))
