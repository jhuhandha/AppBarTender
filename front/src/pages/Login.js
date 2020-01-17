import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Notifications, {notify} from 'react-notify-toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { fetchLogin } from './../redux/actions/login';

import './../styles/login.css';

const authSchema = Yup.object().shape({
    username: Yup.string()
        .required('The username field is required'),
    password: Yup.string()
        .required('The password field is required')
});

export class Login extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if(this.props.payload){
            if(this.props.payload.ok){
                this.props.history.push('/home');
            }else{
                notify.show(this.props.payload.message, 'error');
            }
        }
        if(this.props.error){
            notify.show(this.props.error.message, 'error');
        }
    }

    render() {
        return (<section className="login-block">
            <Notifications />
            <div className="_container container">
                <div className="row">
                    <div className="col-md-4 login-sec">
                        <h2 className="text-center">Login Now</h2>
                        <Formik
                            className="login-form"
                            initialValues={{ username: '', password: '' }}
                            validationSchema={authSchema}
                            onSubmit={values => {
                                this.props.login(values);
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Username</label>
                                        <Field name="username" className="form-control" />
                                        {errors.username && touched.username ? (
                                            <p className="text-danger">{errors.username}</p>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                        <Field type="password" name="password" className="form-control" />
                                        {errors.password && touched.password ? (
                                            <p className="text-danger">{errors.password}</p>
                                        ) : null}
                                    </div>

                                    <div className="form-check">
                                        {!this.props.loading ?
                                            <button type="submit" className="btn btn-login float-right">Login</button>
                                            :
                                            <Spinner type="grow" color="primary" />
                                        }

                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="col-md-8 banner-sec">
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            </ol>
                            <div className="carousel-inner" role="listbox">
                                <div className="carousel-item active">
                                    <img className="d-block img-fluid" src="https://images.pexels.com/photos/681846/pexels-photo-681846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                        alt="First slide" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
    }
}

const mapStateToProps = state => {
    return {
        payload: state.login.payload,
        error: state.login.error,
        loading: state.login.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: data => dispatch(fetchLogin(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
