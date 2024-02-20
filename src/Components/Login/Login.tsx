import {Formik, Form, ErrorMessage, Field } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import * as Yup from 'yup'
import { authContext } from '../../Context/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required')
});

export default function Login() {

  const {setToken} = useContext(authContext);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isButtonSpin, setIsButtonSpin] = useState<boolean>(false);
  const Navigate = useNavigate();

  const sendData = async(values: any) => {
    setIsButtonSpin(true);
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).then((response) => {
      console.log(response.data);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      Navigate('/home')
    }).catch((error) => {
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    })
    setIsButtonSpin(false);
  }
  return (
      <div className='login text-start py-5' style={{margin: "115px 0px"}}>
        <div className="container">
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <h3>Login:</h3>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              sendData(values);
            }}>
            <Form>
              <label htmlFor="email" className='mt-3'>Email:</label>
              <Field type="email" className="form-control" name='email' />
              <ErrorMessage name='email' component='div' className='alert alert-danger mt-2' />
  
              <label htmlFor="password" className='mt-3'>Password:</label>
              <Field type="password" className="form-control" name='password' />
              <ErrorMessage name='password' component='div' className='alert alert-danger mt-2' />
  
              <div className='d-flex flex-row-reverse mt-3'>
                <button className={`btn bg-main text-white ${isButtonSpin ? 'disabled' : ''}`} type='submit'>
                  {isButtonSpin ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Login'}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
  )
}
