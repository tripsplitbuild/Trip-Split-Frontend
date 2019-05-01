import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../css/index.css';
import Trip from '../Trip/Trip';
import {connect} from 'react-redux';
import axios from 'axios';


class ProfileHome extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:{
                id: '',
                username: '',
                first_name: '',
                last_name: '',
                gender: '',
                ownedTrips: [], 
                memberTrips: []            
        }
    }//constructor
}

    componentDidMount(){
       
        console.log(this.props.credentials.id)
       axios.get(`http://localhost:9090/users/${this.props.credentials.id}`, {
        headers: { Authorization: localStorage.getItem("token") }})
       .then((res) => {
        return this.setState({
            user: {
                id: this.props.credentials.id,
                username: res.data.username,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                gender: res.data.gender,
                ownedTrips: res.data.ownedTrips,
                memberTrips: res.data.memberTrips}}
        ),     
         console.log(this.state.user)})
       .catch(err => console.log(err))}
       //console.log(this.props.credentials.id)
     

    render(){
        return(
            <div>
                <div className="header">
                    <h1>Hi {this.state.user.first_name}!</h1>
                    <h3>{this.state.user.username}</h3>
                </div>
               
                <div className="trip-data">
                    <div className="trip-owned">
                        <h4>Trips You Created</h4>
                        {this.state.user.ownedTrips.map((tripO,index) =>{
                            return(
                                <ul key={index}>
                                    <li>{tripO.trip_name}</li>
                                    <p>Total Expenses: $1,280.72</p>
                                    <Link to="/profile/trip"><button>Trip Details</button></Link>
                                </ul>
                            ) 
                            console.log(tripO)
                        })}
                    </div>
                    <div className="trip-member">
                        <h4>Trips You're A Member Of</h4>
                        {this.state.user.memberTrips.map(tripM =>{
                            return(
                                <ul>
                                    <li>{tripM}</li>
                                    <p>Total Expenses: $1,280.72</p> 
                                    <button>Trip Details</button>
                                </ul>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
      isRegistering: state.isRegistering,
      isLoggedIn: state.isLoggedIn,
      credentials: state.credentials
    };
  };
  
  export default connect(
    mapStateToProps,
    {}
  )(ProfileHome);