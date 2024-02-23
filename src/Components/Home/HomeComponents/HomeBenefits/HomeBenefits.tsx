export default function HomeBenefits() {
    return (
        <div className='home-benefits pb-5'>
            <div className="row gy-2 justify-content-between">
                <div className="col-md-3 col-6">
                    <div className="d-flex align-items-center">
                        <i className="fa-solid fa-truck fs-1 text-warning"></i>
                        <div className='ms-3'>
                            <p>FREE DELIVERY</p>
                            <p className='text-secondary'>For all orders over $120</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="d-flex">
                        <i className="fa-solid fa-shield fs-1 text-warning"></i>
                        <div className='ms-3'>
                            <p>SAFE PAYMENT</p>
                            <p className='text-secondary'>100% secure payment</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="d-flex">
                        <i className="fa-solid fa-comments fs-1 text-warning"></i>
                        <div className='ms-3'>
                            <p>24/7 HELP CENTER</p>
                            <p className='text-secondary'>Delicated 24/7 support</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="d-flex">
                        <i className="fa-solid fa-headset fs-1 text-warning"></i>
                        <div className='ms-3'>
                            <p>FRIENDLY SERVICES</p>
                            <p className='text-secondary'>30 day satisfaction guarantee</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
