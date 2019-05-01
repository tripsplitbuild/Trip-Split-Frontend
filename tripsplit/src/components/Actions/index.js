import axios from 'axios';

export const REGISTRATION = "REGISTRATION"; 
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";


export const register = user => dispatch =>{
    

    return axios.post("http://localhost:9090/authentication/register", user)
    .then(res => {
        console.log(res.data)
        dispatch({type: REGISTRATION,
                   payload: res.data });
        localStorage.setItem("token", res.data.token)
    })
    .catch(err => console.log(err))
}

export const login = credentials => dispatch =>{

    return axios.post("http://localhost:9090/authentication/login", credentials)
    .then(res =>{
        localStorage.setItem("token", res.data.token)
        if(localStorage.getItem("token")){
            console.log('in login')
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data});
            console.log(res.data)}
        
        else{
            dispatch({type: LOGIN_FAILURE});
        }
    })
    .catch(err => console.log(err))
}