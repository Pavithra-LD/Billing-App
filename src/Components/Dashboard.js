import React,{useEffect, useState} from 'react' 
import { useSelector} from 'react-redux'
import { products } from '../Action/billingAction'



const Dashboard=()=>{   
    const customers=useSelector((state)=>{
        return state.customers
    })

    const products =useSelector((state)=>{
        return state.products
    })

    const billings=useSelector((state)=>{
        return state.billings
    })
    
    return(
        <div>
            <div class="container">
            <div class="row">
                <div class="col-4">
                <div class="card text-white bg-primary mb-3" >
                    <h3 class="card-header" style={{textAlign:"center"}}>Total customers </h3>
                    <h4 class="card-title" style={{textAlign:"center"}}>{customers.length}</h4>
                </div> 
                </div>
            <div class="col-4">
            <div class="card text-white bg-primary mb-3" >
                <h3 class="card-header" style={{textAlign:"center"}}>Total Products </h3>
                <h4 class="card-title" style={{textAlign:"center"}}>{products.length}</h4>

            </div>
            </div>
            <div class="col-4">
            <div class="card text-white bg-primary mb-3" >
                <h3 class="card-header" style={{textAlign:"center"}}>Total Billings </h3>
                <h4 class="card-title" style={{textAlign:"center"}}>{billings.length}</h4>

            </div>
            </div>
            </div>
        </div>
        </div>
    )
}
export default Dashboard