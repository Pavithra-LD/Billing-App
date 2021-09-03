import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Link,Route } from 'react-router-dom'
import { addBillingItem, resetCartItem } from '../Action/singleBillingAction'
import { startGetBilling } from '../Action/customerBillingAction'
import BillingItemList from './BillingItemList'
import CustomerForm from '../Components/CustomerForm'
import { Modal, Button } from 'react-bootstrap'
import AddCustomer from '../Components/AddCustomer'


const SelectCustomer=(props)=>{
    const[customer,setCustomer]=useState('')
    const[product,setProduct]=useState('') 
    const [productPrice,setProductPrice]=useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [count,setCount]=useState(0)
    const [lineItems,setLineItems]=useState([])
    const [billingdata,setBillingData]=useState({})
    const [addNew, setAddNew]=useState(false)

    const dispatch=useDispatch()

    const customers=useSelector((state)=>{
        return state.customers
    })

    const products=useSelector((state)=>{
        return state.products
    })

    const bill=useSelector((state)=>{
        return state.custBilling
    })

    const handleSelectChange=((e)=>{
        setCustomer(e.target.value)
        dispatch(resetCartItem())
        //console.log(e.target.value)
    })

    const handleProductChange=((e)=>{
        //console.log(e.target.value)
        const productId=e.target.value
        const price=products.filter((ele)=>{
            return productId===ele._id
        })
        //console.log(price)
        price.map((ele)=>{
            setProduct(ele._id)
            setProductPrice(ele.price)
        })

        
    })

    // console.log(product)
    // console.log(productPrice)


    const handleCountReduce=()=>{
        setCount(count-1)
    }

    const handleCountAdd=()=>{
        setCount(count+1)
    }

    const handleQuantityChange=((e)=>{
        setCount(Number(e.target.value))
    })

    const handleAdd=()=>{
        let proItems={
            "id":Number(new Date()),
            "product":product,
            "price":productPrice,
            "quantity":count
        }
        
        setLineItems([proItems,...lineItems])

        // let billItems={
        //     "date":startDate,
        //     "customer":customer, 
        //     "lineItems":lineItems
        // }

        // setBillingData(billItems)
        
        dispatch(addBillingItem(proItems))
    }

    const handleAddNew=()=>{
        setAddNew(!addNew)
    }

    //console.log(lineItems,"lineitems")
    
    // const handleGenerate=()=>{
        
    //     //console.log(billItems)
        
    //     dispatch(startGenerateBill(billItems))
    // }
     //console.log(billingdata)

    return(

        
        <div className="container" >
            <div className="row" style={{marginBottom:"30px"}}>
            <div className="col-md-2">
                <DatePicker 
                selected={startDate} 
                dateFormat="dd/MM/yyyy"
                selectsStart
                 onChange={date => setStartDate(date)}/> 
                </div> 
                <div className="col-md-4">
                <form>
                    <select value={customer} onChange={handleSelectChange} style={{marginRight:"5px"}}>
                        <option value="">Select Customer</option>
                        {
                            customers.map((cus,i)=>{
                                return <option value={cus._id} key={i}>{cus.name}</option>
                            })
                        }
                    </select>

                     <select value={product} onChange={handleProductChange}>
                        <option value="">Select Product</option>
                        {
                            products.map((pro,i)=>{
                                return <option value={pro._id} key={i}>{pro.name}</option>
                            })
                        }
                    </select>
                </form>
                </div>
                    <div className="col-md-2">
                        <label>Quantity</label>
                        <button type="button" class="btn btn-primary btn-circle btn-sm"  style={{marginRight:"4px"}}
                        onClick={handleCountReduce}>-</button>
                        <input type="text" value={count} onChange={handleQuantityChange} style={{width:"20px",marginRight:"4px"}}/>
                        <button type="button" class="btn btn-primary btn-circle btn-sm" onClick={handleCountAdd}>+</button>
                    </div>
                    <div className="col-md-2">
                    {customer && product && <button type="button" class="btn btn-success btn-circle btn-sm" onClick={handleAdd}>Add</button>}
                    </div>

                    <div className="col-md-2"><button class="btn btn-success"onClick={handleAddNew}>Add new Customer</button></div>
                </div>            

                    
                    {customer && <BillingItemList date={startDate} customerId={customer} />}

                     {addNew && 
                     <div><Modal show={addNew} onHide={handleAddNew} >
                     <Modal.Body>
                     <AddCustomer/>
                        
                     </Modal.Body>
                     <Modal.Footer>
                         <Button onClick={handleAddNew}>Close</Button>
                     </Modal.Footer>
                 </Modal>

                     </div>
                    }
                     
            

            
        </div>
    )
}
export default SelectCustomer