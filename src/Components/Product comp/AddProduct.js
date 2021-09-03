import React from 'react'
import ProductForm from './ProductForm'
import { startAddproduct } from '../../Action/productAction'
import { useDispatch } from 'react-redux'


const AddProduct=(props)=>{
    const dispatch=useDispatch()

    const productFormSub=(productData)=>{
        dispatch(startAddproduct(productData))
    }

    return(
        <div>
            <div class="d-flex justify-content-center">
                <h4 style={{marginRight:"20px"}}>Add Product</h4>
                <ProductForm productFormSub={productFormSub}/>
            </div>
        </div>
    )
}
export default AddProduct