import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { Link,Route } from 'react-router-dom'
import SelectCustomer from './SelectCustomer'
import ListingBill  from './ListingBill'


const BillingContainer=(props)=>{
    const[toggle,setToggle]=useState(false)

    const handleToggle=()=>{
        setToggle(!toggle)
    }

    return(
        <div> 
             
                    
            {!toggle ? 
            <div>
                <div className="d-flex justify-content-sm-end" style={{marginBottom:"20px"}}>
                 <div className="col-md-">
                    <Link to="/account/bills/all"><button type="button" class="btn btn-secondary" style={{marginRight:"20px"}}onClick={handleToggle}  >View all Billings</button></Link>
                 </div>
                </div>
            <SelectCustomer/> 
            
            </div> : 
            
            <ListingBill handleToggle={handleToggle}/>}
            
           
        </div>
    )
}

export default BillingContainer