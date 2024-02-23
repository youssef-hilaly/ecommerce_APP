import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className='py-5'>
      <div className="container">
        <div className="footer-content text-start">
          <h3 className='text-primary'>Get the Hilalymarket app</h3>
          <p>We will sent you a link open it on your phone to download the app</p>
        </div>
        <form className='mt-3'>
          <div className="row">
            <div className="col-md-9">
              <input type="text" placeholder="Enter your phone number" className='form-control' />
            </div>
            <div className="col-md-3 mt-2 mt-md-0">
              <button className='btn bg-primary text-white w-100'>Share App Link</button>
            </div>
          </div>
        </form>
        <div className="footer-payment py-2 mt-3">
          <div className="d-md-flex justify-content-between py-3">
            <div className="payment-partners d-sm-flex align-items-center">
              <p className='me-3 mb-1'>Payment Partners </p>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Amazon_Pay_logo.svg/2560px-Amazon_Pay_logo.svg.png" alt="" />
              <img src="https://w7.pngwing.com/pngs/382/146/png-transparent-american-express-logo-icons-logos-emojis-iconic-brands.png" alt="" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png" alt="" />
            </div>
            <div className="app-links d-sm-flex mt-3 mt-md-0 align-items-center">
              <p>Get deliveries with FreshCart</p>
              <img src="https://transmea.b-cdn.net/wp-content/uploads/2023/11/download-on-the-app-store-apple-logo-png-transparent.png" alt="" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkAai6SGG49ROgKZFKg87y4grHONYM9OYfhB_Hyze9ASZaC-aOEJFDgZx-KTdbDq8c62Q&usqp=CAU" alt="" />
            </div>
          </div>
        </div>

      </div>
    </footer>

  )
}
