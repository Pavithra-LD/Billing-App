import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import ProductItem from './ProductItem'

const ProductList=(props)=>{
    const [term,setTerm]=useState('')
    const products=useSelector((state)=>{
        return state.products
    })

    const productList=products.filter((ele)=>{
        return ele.name.toLowerCase().includes(term)
    })

    const handleChange=(e)=>{
        setTerm(e.target.value)
    }

    return(
        <div class="container">
            {products.length===0 ? (
                <>
                <h3>No products found</h3>
                </>
            ):
            <>
            
            <div class="row">
                <div class="col-md-25">
                <input value={term} onChange={handleChange} placeholder="Search product" style={{marginBottom:"10px"}}/>
                </div>
            </div>

            <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <div class="card" style={{width: "50rem"}}>
                    <table class="table table-striped">
                        <thead class="table-dark">
                            <tr>  
                                <th>#</th>                     
                                <th>Product</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList.map((product,i)=>{
                                return(
                                    <tr key={product._id}>
                                        <ProductItem
                                        key={product._id}
                                        {...product}
                                        i={i}
                                        />
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            </>
            }

        </div>
    )
}
export default ProductList 