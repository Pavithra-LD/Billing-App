import React from 'react'
import image from '../../src/images/feature1.jpg'


const Home=(props)=>{

    return(

        <div>
            <h1 style={{fontSize:"50px"},{marginBottom:"5rem"}}className="fst-italic">Billing App</h1>

            <div className="row">
                <div className="col-md-5" style={{marginLeft:"20px",marginTop:"5rem"}}>
                    <p className="fst-italic" style={{fontSize:"25px"}}>Generate unlimited invoices to the specified customer, add as many items as you wish such as products with fixed prices. The user-friendly interface of the invoice generator also lets you add new clients and manage them easily. </p>
                </div>

                <div className="col-md-5">
                    <img src={image} className="img-circle" alt="image" style={{height:"25rem"},{width:"34rem"}}></img>
                </div>
            </div>
            
        </div>
    )
}
export default Home