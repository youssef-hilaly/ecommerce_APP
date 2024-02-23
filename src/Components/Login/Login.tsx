import { Formik, Form, ErrorMessage, Field } from 'formik'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import * as Yup from 'yup'
import { authContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required')
});

export default function Login() {

  const { setToken, setUserId } = useContext(authContext);

  const [isButtonSpin, setIsButtonSpin] = useState<boolean>(false);
  const Navigate = useNavigate();


  function parseJwt(token: string): any {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  const sendData = async (values: any) => {
    setIsButtonSpin(true);
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
    .then((response) => {
      // user token
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      // user id
      let id = parseJwt(response.data.token).id;
      setUserId(id);
      localStorage.setItem('id', id);
      // navigate to home
      Navigate('/home')
    }).catch((error) => {
      if (error.code === 'ERR_NETWORK') {
        toast.error("Network Error");
      }
      else if (error.code == 'ERR_BAD_REQUEST') {
        toast.error("Invalid Email or Password");
      }
      else {
        toast.error("Error sending Code");
      }
    })
    setIsButtonSpin(false);
  }

  return (
    <div className='login text-start py-5' style={{ margin: "115px 0px" }}>
      <div className="container">
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

            <div className='d-flex flex-row justify-content-between mt-3'>
              <Link to='/forgetpassword'>
                <p className='text-primary'>Forget password?</p>
              </Link>
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
