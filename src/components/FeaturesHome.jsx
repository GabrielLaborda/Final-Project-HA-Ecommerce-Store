import React from 'react'

function FeaturesHome() {
  return (
    <>
        <div className="container">
            <h3 className='text-center text-white my-5'>FEATURES</h3>
            <div className="row">
                <div className="col-3 w-25 d-flex flex-column align-items-center">
                    <img className='img-fluid' src="./ImgHome/Features_1.webp" alt="" />
                    <h6 className='my-3'>BAMBINO SKIPPER</h6>
                    <p>USD 118.95</p>
                </div>
                <div className="col-3 w-25 d-flex flex-column align-items-center">
                    <img className='img-fluid' src="./ImgHome/Features_2.webp" alt="" />
                    <h6 className='my-3'>BAMBINO SHOREBREAK</h6>
                    <p>USD 118.95</p>
                </div>
                <div className="col-3 w-25 d-flex flex-column align-items-center">
                    <img className='img-fluid' src="./ImgHome/Features_3.webp" alt="" />
                    <h6 className='my-3'>BAMBINO BIVY</h6>
                    <p>USD 118.95</p>
                </div>
                <div className="col-3 w-25 d-flex flex-column align-items-center">
                    <img className='img-fluid' src="./ImgHome/Features_4.webp" alt="" />
                    <h6 className='my-3'>STRANDSQUAL</h6>
                    <p>USD 118.95</p>
                </div>
            </div> 
        </div>
    </>
  )
}

export default FeaturesHome