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
                tripsOwned: [], 
                tripsMemberOf: []            
        }
    }//constructor
}

    componentDidMount(){
        const token= localStorage.getItem('jwt');
        const reqOptions = {
            headers:{
                Authorization: token
            }
        }
        console.log(this.props.credentials.id)
       axios.get(`http://localhost:9090/users/7`, reqOptions)
       .then(res => {
    //     this.setState({
    //        user: {
    //            id: this.props.credentials.id,
    //            username: res.data.username,
    //            first_name: res.data.first_name,
    //            last_name: res.data.last_name,
    //            gender: res.data.gender,
    //            ownedTrips: res.data.ownedTrips,
    //            memberTrips: res.data.ownedTrips  

    //        }
    //    })
        return console.log('hi')})
       .catch(err => console.log(err))
       //console.log(this.props.credentials.id)
     }

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
                        {this.state.user.tripsOwned.map(tripO =>{
                            return(
                                <ul>
                                    <li>{tripO}</li>
                                    <p>Total Expenses: $1,280.72</p>
                                    <Link to="/profile/trip"><button>Trip Details</button></Link>
                                </ul>
                            )
                        })}
                    </div>
                    <div className="trip-member">
                        <h4>Trips You're A Member Of</h4>
                        {this.state.user.tripsMemberOf.map(tripM =>{
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