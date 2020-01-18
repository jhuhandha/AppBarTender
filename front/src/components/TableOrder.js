import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';

import services from './../services/api';

var total = 0;

const Rows = (props) => {

    let token = new services().getToken();

    return props.drink_order.map((e, i) => {
        total += e.subtotal;
        return <tr key={i}>
            <td style={{ display: 'flex', alignItems: 'center' }}>
                {token ? <img src={`${new services().getBaseUrl()}/api/drink/show/${e.drink.icon}?token=${token}`} /> : <Spinner type="grow" color="primary" />}
                <p style={{ color: '#484847', fontSize: 18 }}>
                    {e.drink.label}
                </p>
            </td>
            <td>
                <p style={{ color: '#bc2c2c', fontWeight: 'bold' }}>X</p>
                <input style={{ background: 'transparent', width: 60, border: 'none' }} type="number" value={e.amount} />
            </td>
            <td>$ {e.subtotal}</td>
        </tr>
    });
}

export default () => {

    const drink_order = useSelector(state => state.order.order_drink);

    return (
        <div>
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
                        drink_order ? <Rows drink_order={drink_order} /> : <></>
                    }
                </tbody>
            </table>
            <div className="row">
                <div className="col-12" style={{borderRadius: 10, padding: 20, backgroundColor:'#ffffff', display:'flex', alignContent: 'space-between'}}>
                    <h4 style={{flex:1}}>Total:</h4>
                    <h4>${total}</h4>
                </div>
            </div>
        </div>
    )
}
