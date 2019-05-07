import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../css/index.css';
import Trip from '../Trip/Trip';
import {connect} from 'react-redux';
import axios from 'axios';
import {createTrip} from '../Actions/index';
import CreateTrip from '../Trip/CreateTrip';
import {showCreate} from '../Motions/motions';

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
    }
    console.log(this.props)
}

    componentDidMount(){       
        console.log(this.props.credentials.id)
       axios.get(`http://localhost:9090/users/${this.props.credentials.id}`, {
        headers: { Authorization: localStorage.getItem("token") }})
       .then((res) => {
        return (this.setState({
            user: {
                id: this.props.credentials.id,
                username: res.data.username,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                gender: res.data.gender,
                ownedTrips: res.data.ownedTrips,
                memberTrips: res.data.memberTrips}}
        )
       .catch(err => console.log(err)))})
       
    }

    
    handleCreate = e =>{
        e.preventDefault();
        showCreate();
        createTrip(this.state.user.id);
    }

    updateTrips = () =>{
        return this.setState({
            user: this.state.user
        }); 
        
    }

    viewTrip = (id) =>{
        
    }
     

    render(){
        return(
            <div>
                <div className="header">
                    <h1>Hi {this.state.user.first_name}!</h1>
                    <h3>{this.state.user.username}</h3>
                </div>
                <span className='create-trip'>
                    <button onClick={this.handleCreate}>Create A New Trip!</button>
                    <span><CreateTrip update={this.updateTrips}/></span>
                </span>
                <div className="trip-data">
                    <div className="trip-owned">
                        <h4>Trips You Created</h4>
                        {this.state.user.ownedTrips.map((tripO) =>{
                            if(tripO.trip_name != null){
                            return(
                                <ul key={tripO.id}>
                                    <li>{tripO.trip_name}</li>
                                    <p>Total Expenses: $1,280.72</p>
                                    <Link to={{pathname: "/profile/trip", state:{trip: tripO.id}}}><button>Trip Details</button></Link>
                                </ul>
                            )}                            
                        })}
                    </div>
                    <div className="trip-member">
                        <h4>Trips You're A Member Of</h4>
                        {this.state.user.memberTrips.map(tripM =>{
                            if(tripM.trip_name != null){
                            return(
                                <ul>
                                    <li>{tripM}</li>
                                    <p>Total Expenses: $1,280.72</p> 
                                    <button>Trip Details</button>
                                </ul>
                            )}
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    console.log(state)
    return{
      isRegistering: state.isRegistering,
      isLoggedIn: state.isLoggedIn,
      credentials: state.credentials,
      id: state.credentials.id,
      user_data: state.user_data
    };
  };
  
  export default connect(
    mapStateToProps,
    {}
  )(ProfileHome);

