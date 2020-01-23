import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';

import { fetchSave } from './../redux/actions/order'

const TIP = [
    { name: "No Tip", icon: "fa fa-times" },
    { name: "10%", icon: "fa fa-money" },
    { name: "20%", icon: "fa fa-credit-card" },
];

export default (props) => {
    const dispatch = useDispatch();
    let loading = useSelector(state => state.order.loading);

    return (
        <div className="container">
            <div className="row">
                <br />
                <div className="col text-center">
                    <h2>Drink Order Tip</h2>
                    <p>Total: ${props.total}</p>
                </div>
            </div>
            <div className="row text-center">
                {!loading ? TIP.map((e, i) => <div onClick={() => dispatch(fetchSave(e.name))} key={i} className="col" style={{ cursor: 'pointer' }}>
                    <div className="counter">
                        <i className={`${e.icon} fa-2x`}></i>
                        <p className="count-text ">{e.name}</p>
                    </div>
                </div>)
                    :
                    <Spinner type="grow" className="text-center" color="primary" />
                }
            </div>
        </div>
    )
}
