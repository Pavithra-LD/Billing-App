const initialStateValue=[]

const customerReducer=(state=initialStateValue,action)=>{
    switch(action.type){
        case "CUSTOMER":{
            return [...action.payload]
        }
        case "ADD_CUSTOMER":{
            return [{...action.payload},...state]
        }
        case "EDIT_CUSTOMER":{
            return (
                state.map((cust)=>{
                    if(action.payload._id===cust._id){
                        return {...cust,...action.payload}
                    }else{
                        return {...cust}
                    }
                })
            )
        }
        case "DELETE_CUST":{
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
export default customerReducer