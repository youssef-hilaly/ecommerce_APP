import axios from 'axios';
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup'
import { IResetPassword } from '../../interfaces/interfaces';

const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email'),
    newPassword: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, 'Password must contain at least one letter and one number'),
});

// Reset Password interface

export default function ResetPassword() {
    const [isButtonSpin, setIsButtonSpin] = useState<boolean>(false);
    const _useNavigate = useNavigate();
    let location = useLocation();

    if (!location.state) {
        return <Navigate to={"/forgetpassword"} />
    }

    const sendData = async (values: IResetPassword) => {
        setIsButtonSpin(true);
        await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
            .then((response) => {
                toast.success("Password Reset Successfully");
                _useNavigate('/login')
            }).catch((error) => {
                if (error.code === 'ERR_NETWORK') {
                    toast.error("Network Error");
                }
                else if (error.code == 'ERR_BAD_REQUEST') {
                    if(error.response.data.message === "reset code not verified")
                    toast.error("reset code not verified");
                    _useNavigate('/forgetpassword')
                }
                else {
                    toast.error("Error resetting Password");
                }
            })
        setIsButtonSpin(false);
    }


    return (
        <div className="container" style={{ height: "70vh" }}>
            <div className="row h-100 align-items-center">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center">Forget Password</h3>
                            <Formik
                                initialValues={{
                                    email: '',
                                    newPassword: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={values => {
                                    sendData(values);
                                }}>
                                <Form>
                                    <label htmlFor="email" className='mt-3'>Email:</label>
                                    <Field type="email" className="form-control" name='email' />
                                    <ErrorMessage name='email' component='div' className='alert alert-danger mt-2' />

                                    <label htmlFor="newPassword" className='mt-3'>New Password:</label>
                                    <Field type="password" className="form-control" name='newPassword' />
                                    <ErrorMessage name='newPassword' component='div' className='alert alert-danger mt-2' />

                                    <div className='d-flex flex-row-reverse mt-3'>
                                        <button className={`btn bg-main text-white ${isButtonSpin ? 'disabled' : ''}`} type='submit'>
                                            {isButtonSpin ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Send'}
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
