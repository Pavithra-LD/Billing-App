import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import axios from '../config/axiosConfig'
import { addBilling } from '../Action/customerBillingAction'
import GenerateBilling from './GenerateBilling' 
import {decItemCount, addItemCount,removeItem} from '../Action/singleBillingAction'
import cartImage from '../images/product.jpg'

const BillingItemList =(props)=>{
    const {startDate,customerId,lineItems}=props

    const dispatch=useDispatch()

    

    const cartItems=useSelector((state)=>{
        return state.custBilling
    })

    const products=useSelector((state)=>{
        return state.products
    })

    const handleDecButton=(id)=>{
        dispatch(decItemCount(id))
    }

    const handleAddButton=(id)=>{
        dispatch(addItemCount(id))
    }

    const handleRemove=(id)=>{
        dispatch(removeItem(id))
    }

    
    return(
        <div>
            <div class="d-flex justify-content-start" style={{backgroundColor:"black",color:"white",marginBottom:"20px"}}>
                <h4>Cart Items -{cartItems.length}</h4> 
            </div>
             <div className="row">      
                {
                    cartItems.map((ele)=>{
                      return  products.map((pro)=>{

                        
                            if(ele.product===pro._id) {
                                return (
                                
                                     
                                    <div key={pro._id} class="card" style={{width:"200px"}}>
                                        <img src={cartImage} class="card-img-top" alt="..."></img>
                                        <div class="card-body">
                                            <h5 class="card-title">{pro.name}</h5>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item"> ₹{ele.price }</li>
                                            <li class="list-group-item">Quantity 
                                                <button type="button" class="btn btn-primary btn-circle btn-sm"
                                                        onClick={()=>{
                                                            handleDecButton(pro._id)
                                                }}>-</button>{ele.quantity}<button type="button" class="btn btn-primary btn-circle btn-sm"
                                                    onClick={()=>{
                                                        handleAddButton(pro._id)
                                                }}>+</button>  
                                            </li>
                                            <button type="button" class="btn btn-danger" onClick={()=>{
                                                handleRemove(ele.id)
                                            
                                            }}>Remove</button>
                                        </ul>
                                    </div>
                                    
                                
                                )
                            }
                        })
                    })
                } 
                </div>               

                <GenerateBilling startDate={startDate} customerId={customerId}/>
        </div>
    )
}

export default BillingItemList