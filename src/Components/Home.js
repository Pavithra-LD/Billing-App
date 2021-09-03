import React from 'react'
import image from '../../src/images/backgr.jpg'


const Home=(props)=>{

    return(

        <div style={{
            backgroundImage:'url('+image+')',
            backgroundSize: "cover",
            height: "600px",
            color: "#f5f5f5"
        }}>
            <h1 style={{fontSize:"50px"}}className="fst-italic">Billing App</h1>

            
            
        </div>
    )
}
export default Home