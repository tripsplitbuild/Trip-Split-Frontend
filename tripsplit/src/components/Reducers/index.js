import {REGISTRATION, LOGIN_SUCCESS, LOGIN_FAILURE, CREATE_TRIP_SUCCESS, CREATING_TRIP} from '../Actions/index';

const initialState = {
    isRegistering: false,
    isLoggedIn: false,
    credentials: {},
    tripCreated: false,
    user_data: {}
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case (REGISTRATION):{
            return{
                ...state,
                isRegistering: true,
                credentials: action.payload
            };
        };
        case (LOGIN_SUCCESS):{
            return{
                ...state,
                credentials: action.payload,
                isLoggedIn: true
            }
        };
        case(CREATING_TRIP):{
             console.log(action.payload)
             return{
                 ...state,
                 user_data: action.payload,
                 tripCreated: false
             }
            
        }
        case(CREATE_TRIP_SUCCESS):{  
            console.log(action.payload)          
            return{
                ...state,
                id: action.payload,
                tripCreated: true                
            }
        }
        default: return state;
    }
}

export default reducer; 