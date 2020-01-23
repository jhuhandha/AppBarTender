import React from 'react';
import { notify } from 'react-notify-toast';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import TableOrder from './../components/TableOrder';

export default function ResultOrder() {

    const order = useSelector(state => state.order.payload);

    const new_order = () => window.location.href = "/order";

    if (order && order.ok) {
        notify.show("Order drink save", "success");

        return (
            <div>
                <div className="row">
                    <div className="col-12 text-center">
                        <h2>Thank you</h2>
                        <h4>Drink Order #{order.order.id}</h4>
                    </div>
                    <div className="col-12">
                        <TableOrder drink_order={order.items} order={order} edit={true} />
                    </div>
                    <div className="col-12">
                        <button type="button" className="btn btn-success btn-block" onClick={new_order}>Create a New Orde</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to="/order" />
    }
}
