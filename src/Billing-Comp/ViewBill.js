import React,{useRef,useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import {savePDF} from '@progress/kendo-react-pdf'
import axios from '../config/axiosConfig'
import { Modal,Button } from 'react-bootstrap'

const ViewBill=(props)=>{

    //const {id}=props.match.params
    const{viewToggle,handleView,id}=props
    //const{id}=props

    // const [view, setView]=useState(true)

    // const handleClose = () => setView(false);
    // const handleShow = () => setView(true);

    const contentArea=useRef(null)

    const billings=useSelector((state)=>{
        return state.billings
    })

    // useEffect(()=>{
    //     axios.get(`/api/bills/${id}`)
    //     .then((response)=>{
    //         setBill(response.data)
    //     })

    // })
    const bill=billings.filter((ele)=>{
            return id===ele._id
            //setToggle(true)
        })
        

    console.log(bill)

    //console.log(bill)

    const customers=useSelector((state)=>{
        return state.customers
    })

    const products=useSelector((state)=>{
        return state.products
    })
    
    const handleSavePDF=(event)=>{
        savePDF(contentArea.current,{paperSize:"A4"})
    }
    

    return(
        <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

        
        <div class="card" style={{width: "50rem"}}>
                         
                {bill.map((bill)=>{
                                return <div key={bill._id}>
                                <div ref={contentArea}>
                                <p>Invoice ID :{bill._id}</p>
                                <p>Date :{bill.date}</p>
                                {customers.map((ele)=>{
                                    if(bill.customer===ele._id){
                                        return <p key={ele._id}>Customer :{ele.name} Mobile :{ele.mobile}</p>
                                        
                                    }
                                })}
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                            {bill.lineItems.map((ele)=>{
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
                                                <td>{bill.total.toFixed(2)}</td>
                                            </tr>

                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td style={{fontWeight:"bold"}}>GST(10%)</td>
                                                <td>{(bill.total*0.10).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td style={{fontWeight:"bold"}}>Total</td>
                                                <td style={{fontWeight:"bold"}}>{(bill.total+bill.total*0.10.toFixed(2)).toFixed(2)}</td>
                                            </tr>
                                            
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" class="btn btn-primary" style={{marginLeft:"680px"}}onClick={handleSavePDF}>Download</button>
                        
                </div>
                            
            
            })}
                
           
            
                            
                            
                
                    {/* </div>
                    <div class="modal-footer">
                        
                    </div>
                    </div> */}
                </div>
         
                </div>

           
        
            
        
    )
}

export default ViewBill