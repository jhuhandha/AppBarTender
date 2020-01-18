import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';

import { fetchIndex } from './../redux/actions/drink';

import FormDrink from './../components/FormDrink';
import TableDrink from './../components/TableDrink';


export class Drink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialValues: { name: '', icon: '', unit_price: 0, edit: false }
        }
    }

    componentDidMount() {
        this.props.fetchIndex();
    }

    componentDidUpdate() {
        if (this.props.payload) {
            if (this.props.payload.ok) {
                notify.show("Drink add", 'success');
            } else {
                notify.show(this.props.payload.message, 'error');
            }
        }
        if (this.props.error) {
            notify.show(this.props.error.message, 'error');
        }
    }

    render() {
        return (
            <div>
                <h2>Drink</h2>
                <FormDrink initialValues={this.props.drink ? {...this.props.drink.drinks, edit:true} :  this.state.initialValues} />
                <br />
                <br />
                <div className="row">
                    <div className="col-12">
                        <TableDrink />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        payload: state.drink.payload,
        error: state.drink.error,
        drink: state.drink.drink
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchIndex: () => dispatch(fetchIndex())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drink);
