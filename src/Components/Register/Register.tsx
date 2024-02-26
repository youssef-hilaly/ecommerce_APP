import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IRegister } from '../../interfaces/interfaces';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required').min(5, 'Name must be at least 5 characters long')
    .matches(/^[a-zA-Z ]+$/, 'Name must contain only letters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, 'Password must contain at least one letter and one number'),
  rePassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], 'Passwords must match'),
  phone: Yup.string().required('Phone is required').matches(/^(01)[0125][0-9]{8}$/, 'accept only egypt phone numbers"')

});

export default function Register(): JSX.Element {

  const [isButtonSpin, setIsButtonSpin] = useState<boolean>(false);
  const Navigate = useNavigate();

  const sendData = async (values: IRegister) => {
    setIsButtonSpin(true);
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then((response) => {
      toast.success("Account Created Successfully");
      Navigate('/login')
    }).catch((error) => {
      if (error.code === 'ERR_NETWORK') {
        toast.error("Network Error");
      }
      else if (error.code === 'ERR_BAD_REQUEST') {
        toast.error("Invalid Email or Password");
      }
      else {
        toast.error("Error sending Code");
      }
    })
    setIsButtonSpin(false);
  }

  return (
    <div className='text-start py-5'>
      <div className="container">
        <h3>Register Now:</h3>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            sendData(values);
          }}>
          <Form>
            <label htmlFor="name" className='mt-3'>Name:</label>
            <Field type="text" className="form-control" name='name' />
            <ErrorMessage name='name' component='div' className='alert alert-danger mt-2' />

            <label htmlFor="email" className='mt-3'>Email:</label>
            <Field type="email" className="form-control" name='email' />
            <ErrorMessage name='email' component='div' className='alert alert-danger mt-2' />

            <label htmlFor="password" className='mt-3'>Password:</label>
            <Field type="password" className="form-control" name='password' />
            <ErrorMessage name='password' component='div' className='alert alert-danger mt-2' />

            <label htmlFor="rePassword" className='mt-3'>Confirm Password:</label>
            <Field type="password" className="form-control" name='rePassword' />
            <ErrorMessage name='rePassword' component='div' className='alert alert-danger mt-2' />

            <label htmlFor="phone" className='mt-3'>Phone:</label>
            <Field type="text" className="form-control" name='phone' />
            <ErrorMessage name='phone' component='div' className='alert alert-danger mt-2' />

            <div className='d-flex flex-row-reverse mt-3'>
              <button className={`btn bg-main text-white ${isButtonSpin ? 'disabled' : ''}`} type='submit'>
                {isButtonSpin ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Register'}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>


  )
}
