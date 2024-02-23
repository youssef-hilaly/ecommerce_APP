import { Link } from 'react-router-dom';
import './Top3Categories.css';

export default function Top3Categories() {
    return (
        <div className="home-top3-categories pb-5">
            <div className="row gy-2">
                <div className="col-md-4">
                    <div className='position-relative overflow-hidden'>
                        <img className='w-100' src={require('../../../../imgs/homefocuse2.jpg')} alt="" />
                        <div className='position-absolute top-50 start-0 translate-middle-y' style={{ left: "27%" }}>
                            <div className='text-white px-3'>
                                <Link to="/categories" >
                                    <p className='h5 mb-0'>Intelligent</p>
                                    <p className='h5'>New Touch Control</p>
                                </Link>
                                <p>Discount 20% On Products</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className='position-relative overflow-hidden'>
                        <img className='w-100' src={require('../../../../imgs/homefocuse3.jpg')} alt="" />
                        <div className='position-absolute top-50 start-0 translate-middle-y' style={{ left: "27%" }}>
                            <div className='text-white px-3'>
                                <Link to="/categories" >
                                    <p className='h5 mb-0'>On-sale</p>
                                    <p className='h5'>Best Prices</p>
                                </Link>
                                <p>Limited Time: Online Only</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className='position-relative overflow-hidden'>
                        <img className='w-100' src={require('../../../../imgs/homefocuse1.jpg')} alt="" />
                        <div className='position-absolute top-50 start-0 translate-middle-y' style={{ left: "27%" }}>
                            <div className='text-white px-3'>
                                <Link to="/categories" >
                                    <p className='h5 mb-0'>Hot Sale</p>
                                    <p className='h5'>Super Laptops 2022</p>
                                </Link>
                                <p>Free Shipping All Order</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
