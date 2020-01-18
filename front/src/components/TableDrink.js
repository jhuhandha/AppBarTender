import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';

import services from './../services/api';
import { fetchEdit, fetchSave } from './../redux/actions/drink';

const Rows = (props) => {
    const dispatch = useDispatch();

    let token = new services().getToken();

    return props.data.map((e, i)=><tr key={i}>
        <td>
            {token ? <img src={`${new services().getBaseUrl()}/api/drink/show/${e.icon}?token=${token}`} /> : <Spinner type="grow" color="primary" />}
        </td>
        <td>{e.name}</td>
        <td>{e.unit_price}</td>
        <td>
            <button onClick={()=>dispatch(fetchEdit(e.id))} type="button" className="btn btn-primary btn-xs">Edit</button>
        </td>
    </tr>)
}

export default (props) => {

    const drinks = useSelector(state => state.drink.drinks)
    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Unit Price</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {drinks ? <Rows data={drinks.drinks} /> : <></>}
            </tbody>
        </table>
    )
}
