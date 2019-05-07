import axios from 'axios';
import ProfileHome from '../Profile/ProfileHome';

export const REGISTRATION = "REGISTRATION"; 
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const CREATING_TRIP  = "CREATING_TRIP";
export const CREATE_TRIP_SUCCESS = "CREATE_TRIP_SUCCESS"; 


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

export const createTrip = (id) => dispatch =>{
    return axios.get(`http://localhost:9090/users/${id}`,
     {headers: { Authorization: localStorage.getItem("token") }})
     .then(res =>{
         dispatch({type: CREATING_TRIP, payload: res.data})
         console.log(res.data)
     })
     .catch(err => console.log(err))    
}

export const tripComplete = (trip) => dispatch=>{
    const token = localStorage.getItem("token"); 
	const reqOptions = {
		headers: {
			Authorization: token
		}
	}
    axios.post("http://localhost:9090/trips/",
    trip, reqOptions)
    .then(res =>{
        dispatch({type: CREATE_TRIP_SUCCESS, payload: trip})
    })
    .catch(err => console.log(err))    
}
