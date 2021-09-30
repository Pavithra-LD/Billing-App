import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {useDispatch} from 'react-redux'
import { startAddCustomer } from '../Action/billingAction'


const CustomerForm=(props)=>{

    const {formsubmission,handleToggle,_id,name,mobile,email,toggle}=props
    
    const formik=useFormik({
        initialValues:{
            _id:_id,
            name:(name?name:''),
            mobile:(mobile?mobile:''),
            email:(email?email:'')
        },

        validationSchema:yup.object({
            name:yup.string()
            .required('Name Required'),
            mobile:yup.string()
            .required('Mobile number Required'),
            email:yup.string()
            .email('Invalid Email Address')
        }),

        onSubmit:(values,{resetForm})=>{
            const customerData=values
            console.log(values)
            resetForm({values:''}) 
              
            formsubmission(customerData)
                  
            if(handleToggle){
                handleToggle()
            }
        }
    })

    return(
        <div>
            
            
            <div class="d-flex justify-content-center">
            {toggle ?<h4>Update Customer</h4>:<h4 style={{marginRight:"20px"}}>Add Customer </h4>}<br/>
            <form onSubmit={formik.handleSubmit} style={{marginBottom:"20px"}}>
                <input style={{marginRight:'20px'}}
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Customer name"               
                /> {formik.touched.name && formik.errors.name} 

                <input style={{marginRight:'20px'}}style={{marginRight:'20px'}}
                type="text"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                placeholder="Mobile"                
                />{formik.touched.mobile && formik.errors.mobile}

                <input style={{marginRight:'20px'}}
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email"               
                />

                {toggle ? (<button type="button" class="btn btn-success" type="submit" >Update</button>
                        ):<button type="button" class="btn btn-success" type="submit" >Add</button>}

            </form>
            
        </div>
        </div>
    )
}
export default CustomerForm