import React,{useState,useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import axios from '../config/axiosConfig'
import { addBilling } from '../Action/customerBillingAction'
import productReducer from '../Reducer/productReducer'

import {savePDF} from '@progress/kendo-react-pdf'

const GenerateBill=(props)=>{

    const{startDate,customerId}=props
    const contentArea=useRef(null)

    const dispatch=useDispatch()

    const[singleBill,setSingleBill]=useState([])
    const[toggle,setToggle]=useState(false)

    const handleSavePDF=(event)=>{
        savePDF(contentArea.current,{paperSize:"A4"})
    }
    
    
    const cartItems=useSelector((state)=>{
        return state.custBilling
    })

    const customers=useSelector((state)=>{
        return state.customers
    })

    const products=useSelector((state)=>{
        return state.products
    })

    const handleToggle=()=>{
        setToggle(true)
    }


    const handleGenerateBill=()=>{     
        let billingItem={
            "date":startDate,
            "customer":customerId, 
            "lineItems":cartItems
        }

        axios.post('/api/bills',billingItem)
        .then((response)=>{
            const result=response.data
            console.log(response.data)
            setSingleBill(result)
            dispatch(addBilling(result))
            setToggle(true)
            
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    const gst=singleBill.total*0.10.toFixed(2)

    

    return(
            <div>    
                {toggle &&
                    <div>
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Bill</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div ref={contentArea}>
                                        <p><text style={{fontWeight:"bold"}}>Invoice ID:</text>{singleBill._id}</p>
                                        <p><text style={{fontWeight:"bold"}}>Date:</text>{singleBill.date}</p>
                                            {customers.map((ele)=>{
                                            if(singleBill.customer===ele._id){
                                                return ( <div key={ele._id}>
                                                    <p key={ele._id}><text style={{fontWeight:"bold"}}>Customer :</text>{ele.name} </p>
                                                    <p><text style={{fontWeight:"bold"}}>Mobile :</text>{ele.mobile}</p>
                                                    </div>    
                                                )
                                            }
                                            })}
                                            <table class="table table-sm">
                                            <thead>
                                                <tr style={{borderBlock:"10px"}}>                           
                                                <th>Item</th>                           
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                    {singleBill.lineItems.map((ele)=>{
                                                        return <tr key={ele._id}>
                                                        {products.map((pro)=>{
                                                            if(ele.product===pro._id){
                                                                return <td key={pro._id}>{pro.name}</td>
                                                            }
                                                        })}
                                                        
                                                        <td>{ele.price.toFixed(2)}</td>
                                                        <td>{ele.quantity}</td>
                                                        <td>{ele.subTotal.toFixed(2)}</td>
                                                        </tr>
                                                        
                                                    })}

                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td style={{fontWeight:"bold"}}>SubTotal</td>
                                                        <td>{singleBill.total.toFixed(2)}</td>
                                                    </tr>

                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td style={{fontWeight:"bold"}}>GST(10%)</td>
                                                        <td>{gst.toFixed(2)}</td>
                                                    </tr>
                                                
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td style={{fontWeight:"bold"}}>Total</td>
                                                        <td style={{fontWeight:"bold"}}>{(singleBill.total+gst).toFixed(2)}</td>
                                                    </tr>
                                            </tbody>
                                        </table>
                                   </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={handleSavePDF}>Download</button>
                                </div>
                                </div>
                            </div>
                            </div>
                    </div>
                      
             }     
                                    
                                    
                      
                            
                   
                            

            <div className="d-flex justify-content-sm-end" style={{marginBottom:"20px"}}>
                {cartItems.length>0 && <button type="button" class="btn btn-primary"  onClick={handleGenerateBill}>Generate Bill</button>}
                {toggle && <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">View</button>   }  
            </div>  

               
                
           
        </div>

        
    )
}

export default GenerateBill