import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

const ProductForm=(props)=>{

    const{productFormSub,_id,name,price,handleToggle,toggle}=props

    const formik=useFormik({
        initialValues:{
            _id:_id,
            name:name?name:'',
            price:price?price:''
        },

        validationSchema:yup.object({
            name:yup.string()
            .required('Product name Required'),
            price:yup.string()
            .required('Price Required')
        }),
        onSubmit:(values,{resetForm})=>{
            const productValues=values
            //console.log(productValues)
            resetForm({values:''})
            productFormSub(productValues)
            if(handleToggle){
                handleToggle()
            }
        }
    })

    return(
        <div>
            <form onSubmit={formik.handleSubmit} style={{marginBottom:"10px"}}>
                <input style={{marginRight:"20px"}}
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Product name"                
                />{formik.touched.name && formik.errors.name}

                <input style={{marginRight:"20px"}}
                type="text"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                placeholder="Price"
                />{formik.touched.price && formik.errors.price} 

                {toggle ? (<button type="button" style={{marginTop:"10px"}}class="btn btn-success" type="submit">Update</button>):(<button type="button" class="btn btn-success" type="submit">Add</button>)}
            </form>
        </div>
    )
}
export default ProductForm