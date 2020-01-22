import React, { useState, useEffect } from 'react';
import { notify } from 'react-notify-toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import { fetchIndex } from './../redux/actions/drink';
import { fetchAdd } from './../redux/actions/order';

const authSchema = Yup.object().shape({
    drink: Yup.string()
        .required('The drink field is required'),
    amount: Yup.number()
        .required('The amount field is required')
        .min(1)
});


export default function FormOrder() {

    const dispatch = useDispatch();

    let [unit_price, setUnitPrice] = useState(0);
    let [initialValue, setInitialValue]=useState({ drink: '', amount: 1 });
    const drinks = useSelector(state => state.drink.drinks);

    useEffect(() => {
        dispatch(fetchIndex());
    }, [])

    return (
        <div>
            <Formik
                className="login-form"
                initialValues={initialValue}
                validationSchema={authSchema}
                onSubmit={(values, {resetForm}) => {
                    let subtotal = parseInt(values.amount)*parseInt(values.drink.unit_price);
                    dispatch(fetchAdd({...values, subtotal}));
                    window.document.querySelector("#amount").value = 1;
                    notify.show('Drink add to order', 'success');
                }}
            >
                {({ errors, touched, setFieldValue, resetForm }) => (
                    <Form>
                        <div className="row">
                            <div className="form-group col-4">
                                <label >Drink</label>
                                <Select
                                    name="drink"
                                    id="drink"
                                    defaultValue=""
                                    options={drinks ? [...drinks.drinks.map(e => ({ value: e.id, label: e.name, icon: e.icon, unit_price: e.unit_price }))] : []}
                                    onChange={(e) => {
                                        setFieldValue("drink", e);
                                        setUnitPrice(e.unit_price);
                                        window.document.querySelector("#amount").focus()
                                    }}
                                />
                                {errors.drink && touched.drink ? (
                                    <p className="text-danger">{errors.drink}</p>
                                ) : null}
                            </div>
                            <div className="form-group col-4">
                                <label  >Amount</label>
                                <Field  type="number" name="amount" id="amount" min="1" className="form-control" />
                                {errors.amount && touched.amount ? (
                                    <p className="text-danger">{errors.amount}</p>
                                ) : null}
                            </div>
                            <div className="form-group col-4">
                                <label>Unit Price</label>
                                <p className="text">${unit_price}</p>
                            </div>
                        </div>

                        <div className="form-check">
                            <button type="submit" className="btn btn-success float-right">Add</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
