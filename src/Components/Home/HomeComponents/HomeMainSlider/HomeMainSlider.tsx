import SimpleSlider from '../../../Slider/SimpleSlider';
import './HomeMainSlider.css';
export default function HomeMainSlider() {
    return (
        <div className='bg-main-ui pb-5 home-main-slider'>
            <SimpleSlider slidesToShow={1} dots={true}>
                <div className='position-relative'>
                    <img className='w-100' src={require('../../../../imgs/imagesdonw1.jpg')} alt="" />
                    <div className='overflow-hidden position-absolute top-50 translate-middle  d-flex justify-content-center flex-column' style={{ left: "27%" }}>
                        <div className='home-slide-animate'>
                            <h1 className='text-white'>Welcome to our store</h1>
                            <p className='text-white'>We have the best products in the market</p>
                            <button className='btn btn-warning w-50 mt-2'>DISCOVER NOW</button>
                        </div>
                    </div>
                </div>
                <div className='position-relative'>
                    <img className='w-100' src={require('../../../../imgs/imagesdonw2.jpg')} alt="" />
                    <div className='position-absolute top-50 translate-middle d-flex justify-content-center flex-column' style={{ left: "27%" }}>
                        <div className='home-slide-animate'>
                            <h1 className='text-white'>SALE 30% OFF</h1>
                            <button className='btn btn-warning w-50 mx-auto'>Hot Deals</button>
                        </div>
                    </div>
                </div>
                <div className='position-relative'>
                    <img className='w-100' src={require('../../../../imgs/imagesdonw3.jpg')} alt="" />
                    <div className='home-slide-animate position-absolute top-50 translate-middle d-flex justify-content-center flex-column' style={{ left: "27%" }}>
                        <div className='home-slide-animate'>
                            <h1 className='text-white'>New Arrivals</h1>
                            <button className='btn btn-warning w-50 mx-auto'>Shop Now</button>
                        </div>
                    </div>
                </div>
            </SimpleSlider>
        </div>
    )
}
