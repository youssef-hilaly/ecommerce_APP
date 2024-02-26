import { Formik, Form, ErrorMessage, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import { authContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  city: Yup.string().required('city is required'),
  phone: Yup.string().required('Phone is required').matches(/^(01)[0125][0-9]{8}$/, 'accept only egypt phone numbers"'),
});

export default function Payment() {

  const { cartID, setEmpty } = useContext(cartContext)
  const { token } = useContext(authContext)
  const navigate = useNavigate();

  function sendData(body: any, isOnline: boolean) {

    const toastId = toast.loading("Please wait...")
    if (!isOnline) {
      axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`, body, { headers: { token: token || '' } })
        .then((response) => {
          toast.success("Order created successfully", { id: toastId });
          setEmpty();
          navigate('/allorders');
        }).catch((error) => {
          toast.error("Error creating order", { id: toastId });
        })

    } else {
      let path = window.location.href;
      let length = path.split('/')[path.split('/').length - 1].length
      path = path.slice(0, path.length - length)
      console.log(path);
      axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${path}`, body, { headers: { token: token || '' } })
        .then((response) => {
          toast.success("Order created successfully", { id: toastId });
          window.open(response.data.session.url, '_blank');

        }).catch((error) => {
          toast.error("Error creating order", { id: toastId });
        })
    }
  }
  return (
    <>
      <div className="container py-5">
        <h2>Payment</h2>
        <Formik
          initialValues={{
            details: '',
            phone: '',
            city: '',
            isOnline: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const body = {
              shippingAddress: {
                details: values.details,
                phone: values.phone,
                city: values.city,
              }
            }
            sendData(body, values.isOnline);
          }}
        >
          <Form>
            <label htmlFor="details" className='mt-3'>Details:</label>
            <Field type="text" className="form-control" name='details' />

            <label htmlFor="phone" className='mt-3'>Phone:</label>
            <Field type="text" className="form-control" name='phone' />
            <ErrorMessage name='phone' component='div' className='alert alert-danger mt-2' />

            <label htmlFor="city" className='mt-3'>City:</label>
            <Field type="text" className="form-control" name='city' />
            <ErrorMessage name='city' component='div' className='alert alert-danger mt-2' />

            <div className='mt-3'>
              <Field type="checkbox" name="isOnline" className="me-2" />
              <label> online Payment</label>
            </div>



            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          </Form>
        </Formik>
      </div>

    </>
  )
}
