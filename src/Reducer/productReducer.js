const initialStateValue=[]

const productReducer=(state=initialStateValue,action)=>{
    switch(action.type){
        case "PRODUCTS":{
            return [...action.payload]
        }
        case "ADD_PRODUCTS":{
            return [{...action.payload},...state]
        }
        case "UPDATE_PRODUCT":{
            return(
                state.map((prod)=>{
                    if(prod._id===action.payload._id){
                        return {...prod,...action.payload}
                    }else{
                        return {...prod}
                    }
                })
            )
        }
        case "DELETE_PRODUCT":{
            return(
                state.filter((ele)=>{
                    return ele._id!=action.payload
                })
            )
        }

        default:{
            return [...state]
        }
    }
}
export default productReducer