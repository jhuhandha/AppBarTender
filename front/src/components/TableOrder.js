import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

import services from './../services/api';
import { fetchUpdateAmount, fetchDelete } from './../redux/actions/order'

const Rows = (props) => {

    let token = new services().getToken();

    const dispatch = useDispatch();

    return props.drink_order.map((e, i) => {
        return <tr key={i}>
            <td>
                <div className="row align-items-center">
                    <div className="col-4 col-md-2" style={{display:'flex', justifyContent:'end'}}>
                        {token ? <img src={`${new services().getBaseUrl()}/api/drink/show/${e.drink.icon}?token=${token}`} /> : <Spinner type="grow" color="primary" />}
                    </div>
                    <div className="col-6 col-md-3 align-self-center" style={{ height: 50 }}>
                        <p style={{ color: '#484847', fontSize: 18, height: 50, display: 'flex',  justifyContent: 'center', alignItems: 'center' }}>
                            {e.drink.label}
                        </p>
                    </div>
                </div>
            </td>
            <td>
                <div className="row align-items-center" >
                    <div className="col-3 col-md-2 align-self-center">
                        <button onClick={() => props.show(e.drink.value)} type="button" className="btn btn-default" style={{ color: '#bc2c2c', fontWeight: 'bold', height: 50 }}>X</button>
                    </div>
                    <div className="col-4 col-md-4" >
                        <input type="number" min="1" value={e.amount} onChange={event => dispatch(fetchUpdateAmount(i, event.target.value))} style={{ background: 'transparent', width: 60, border: 'none' }} />
                    </div>
                </div>
            </td>
            <td>
                <div className="row align-items-center" style={{ height: 50 }}>
                    <div className="col align-self-center">
                        $ {e.subtotal}
                    </div>
                </div>
            </td>
        </tr>
    });
}

export default () => {

    const drink_order = useSelector(state => state.order.order_drink);
    let [show, setShow] = useState(false);
    let [id, setId] = useState(0);
    const dispatch = useDispatch();

    return (
        <div>
            <SweetAlert
                show={show}
                warning
                showCancel
                confirmBtnText="Yes"
                confirmBtnBsStyle="success"
                title="!Espera!"
                onConfirm={() => {setShow(false); dispatch(fetchDelete(id))}}
                onCancel={() => setShow(false) } 
            >
                ¿Desea eliminar la bebida?
                </SweetAlert>
            <table className="table">
                <thead>
                    <tr style={{ borderBottom: "3px solid #bc2d2c" }}>
                        <th>My Drinks</th>
                        <th>Order</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        drink_order ? <Rows show={id => { setShow(true); setId(id); }} drink_order={drink_order} /> : <></>
                    }
                </tbody>
            </table>
            <div className="row">
                <div className="col-12" style={{ borderRadius: 10, padding: 20, backgroundColor: '#ffffff', display: 'flex', alignContent: 'space-between' }}>
                    <h4 style={{ flex: 1 }}>Total:</h4>
                    <h4>${drink_order ? drink_order.map(e => e.subtotal).reduce((a, v) => { return a + v }, 0) : 0}</h4>
                </div>
            </div>
        </div>
    )
}
