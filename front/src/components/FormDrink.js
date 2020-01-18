import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Spinner } from 'reactstrap';
import * as Yup from 'yup';

import { fetchSave, fetchModify } from './../redux/actions/drink';

const drinkSchema = Yup.object().shape({
    name: Yup.string()
        .required('The name field is required'),
    icon: Yup.string()
        .required('The icon field is required'),
    unit_price: Yup.number()
        .required('The unit price field is required')
        .min(1, 'The unit price field must be greater than or equal to 1')
});


export default (props) => {

    const loading = useSelector(state => state.drink.loading)
    const dispatch = useDispatch();

    return (
        <div>
            <Formik
                className="login-form"
                initialValues={props.initialValues}
                validationSchema={drinkSchema}
                enableReinitialize={true}
                onSubmit={values => {

                    const data = new FormData();
                    data.append('name', values.name);
                    data.append('image', values.icon);
                    data.append('unit_price', values.unit_price);

                    if (!props.initialValues.edit) {
                        dispatch(fetchSave(data));
                    }else{
                        dispatch(fetchModify(data, props.initialValues.id));
                    }
                }}
            >
                {({ errors, touched, setFieldValue }) => (
                    <Form>
                        <div className="row">
                            <div className="form-group col-4">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <Field name="name" className="form-control" />
                                {errors.name && touched.name ? (
                                    <p className="text-danger">{errors.name}</p>
                                ) : null}
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="exampleInputPassword1">Icon</label>
                                <input id="icon" name="icon" type="file" onChange={(event) => {
                                    setFieldValue("icon", event.currentTarget.files[0]);
                                }} className="form-control" />
                                {errors.icon && touched.icon ? (
                                    <p className="text-danger">{errors.icon}</p>
                                ) : null}
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="exampleInputEmail1">Unit Price</label>
                                <Field type="number" name="unit_price" className="form-control" />
                                {errors.unit_price && touched.unit_price ? (
                                    <p className="text-danger">{errors.unit_price}</p>
                                ) : null}
                            </div>
                        </div>
                        <div className="form-check">
                            {!loading ?
                                (! props.initialValues.edit ? 
                                <button type="submit" className="btn btn-success float-right">Save</button>
                                :
                                <button type="submit" className="btn btn-warning float-right">Modify</button>
                                )
                                :
                                <Spinner type="grow" className="float-right" color="primary" />
                            }

                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
