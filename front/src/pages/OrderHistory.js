import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import TableOrder from './../components/TableOrder';

import { fetchIndex } from './../redux/actions/order';

export class OrderHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drinks: null,
            modal: false
        }
    }

    componentDidMount() {
        this.props.fetchIndex();
    }

    toggle = () => this.setState({ modal: !this.state.modal })

    drinks = drink => {
        let data = {
            order: {
                subtotal: drink.subtotal,
                tip: drink.tip,
                total: drink.total,
            },
            items: drink.order_has_drinks.map(e => ({
                amount: e.amount,
                subtotal: e.subtotal,
                drink: { ...e.drink, value: e.drink.id, label: e.drink.name }
            }))
        }
        this.setState({
            drink: data,
            modal: true
        });
    }

    render() {
        console.log(this.props.orders)
        return (
            <div>
                <h2>Order History</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Bartender</th>
                            <th>Date</th>
                            <th>Subtotal</th>
                            <th>Tip</th>
                            <th>Total</th>
                            <th>Drinks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.orders ?
                            this.props.orders.orders.map((e, i) =>
                                <tr key={i}>
                                    <td>{e.id}</td>
                                    <td>{e.user.name}</td>
                                    <td>{moment(e.date).format("D-M-Y H:m:s")}</td>
                                    <td>${e.subtotal}</td>
                                    <td>{e.tip}</td>
                                    <td>${e.total}</td>
                                    <td>
                                        <button onClick={() => this.drinks(e)} type="button" className="btn btn-info btn-xs"><i className="fa fa-eye"></i></button>
                                    </td>
                                </tr>
                            )
                            :
                            <tr>
                                <td colSpan=""></td>
                            </tr>
                        }
                    </tbody>
                </table>
                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} backdrop='static'>
                    <ModalHeader toggle={this.toggle}>Drinks</ModalHeader>
                    <ModalBody>
                        {this.state.drink ?
                            <TableOrder drink_order={this.state.drink.items} order={this.state.drink} edit={true} />
                            :
                            <></>
                        }
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
        orders: state.order.orders,
        error: state.order.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchIndex: () => dispatch(fetchIndex())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
