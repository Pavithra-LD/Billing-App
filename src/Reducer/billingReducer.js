const initialStateValue=[]

const billingReducer=(state=initialStateValue,action)=>{
    switch(action.type){
        case "GET_BILLS":{
            return [...action.payload]
        }

        case "ADD_BILL":{
            return [{...action.payload},...state] 
        }

        case "DELETE_BILL":{
            return(
            state.filter((bill)=>{
                return bill._id!=action.payload
            })
        )}
        default:{
            return [...state]
        }
    }
}

export default billingReducer