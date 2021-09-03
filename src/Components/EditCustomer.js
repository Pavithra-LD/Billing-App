import React from 'react'
import CustomerForm from './CustomerForm'
import { useDispatch } from 'react-redux'
import { startUpdateCustomer } from '../Action/billingAction'
import {Modal,Button} from 'react-bootstrap'

const EditCustomer=(props)=>{
    const {_id,name,mobile,email,handleToggle,toggle}=props
    const dispatch=useDispatch()

    const formsubmission=(customerData)=>{
      dispatch(startUpdateCustomer(customerData))  
    }
    return(
        <div> 
          <Modal show={toggle} onHide={handleToggle} className="editModal">
                <Modal.Body>
                <CustomerForm
                        _id={_id}
                        name={name}
                        mobile={mobile}
                        email={email}
                        formsubmission={formsubmission} 
                        handleToggle={handleToggle}
                        toggle={toggle}
                        />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleToggle}>cancel</Button>
                </Modal.Footer>
            </Modal>

          
            
                        
                            
        </div>
    )
}
export default EditCustomer