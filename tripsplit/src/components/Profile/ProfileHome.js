import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../css/index.css';
import Trip from '../Trip/Trip';


export default class ProfileHome extends Component{
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
        this.setState(
            {
                user:{
                    id: 1,
                    username: 'kingofgames',
                    first_name: 'Yugi',
                    last_name: 'Muto',
                    gender: 'male',
                    tripsOwned: ['disney', 'roadtrip'], 
                    tripsMemberOf: ['lake tahoe', 'vegas']
                }
            }
        )
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