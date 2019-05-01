import {REGISTRATION, LOGIN_SUCCESS, LOGIN_FAILURE} from '../Actions/index';

const initialState = {
    isRegistering: false,
    isLoggedIn: false,
    credentials: {}

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
        }
        default: return state;
    }
}

export default reducer; 