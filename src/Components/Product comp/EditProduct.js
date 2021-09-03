import React from 'react'
import { useDispatch } from 'react-redux'
import ProductForm from './ProductForm'
import { startUpdateProduct } from '../../Action/productAction'
import {Modal,Button} from 'react-bootstrap'

const EditProduct=(props)=>{
    const {_id,name,price,handleToggle,toggle}=props
    const dispatch=useDispatch()

    const productFormSub=(productData)=>{
        //console.log(productData)
        dispatch(startUpdateProduct(productData))
    }

    return(
        <div>

            <Modal show={toggle} onHide={handleToggle} >
                <Modal.Body>
                <ProductForm
                    _id={_id}
                    name={name}
                    price={price}
                    productFormSub={productFormSub}
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
export default EditProduct