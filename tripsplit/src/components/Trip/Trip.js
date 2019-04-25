import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import '../../css/index.css';
import ExpenseTrip from './ExpenseTrip';

export default class Trip extends Component{
    constructor(props){
        super(props);
        this.state = {
            trip:{
                tripId:'',
                tripName: '',
                expenseId:'',
                expenses:[],
                tripOwner:'',
                tripMembers:''
            }
        }
    }

    componentDidMount(){
        this.setState({
            trip:{
                tripId:'1',
                tripName: 'Incredible Excursion',
                expensId:'1',
                expenses:[{
                    id: 1,
                    expenseName:'food',
                    expenseTotal: 50.63
                }],
                tripOwner:'kingofgames',
                tripMembers:['pillowtopabs', 'twoleftfeet', 'incrediblesitter']
            }
        }
        )
    }

    render(){
        return(
            <div>
                <div className='trip'>
                <div className='header'>
                    <h1>{this.state.trip.tripName}</h1>
                    <h3>By: {this.state.trip.tripOwner}</h3>
                </div>
                <div className='trip-data'>
                    <div className='members'>
                        <h4>Trip Members</h4>
                        <div className='trip-members'>
                            {Array.from(this.state.trip.tripMembers).map(member => {
                                return(<li>{member}</li>)
                            })}
                        </div>
                        <button>Add Members</button>
                    </div>
                    <div className='trip-expenses'>
                        <h4>Trip Expenses</h4>
                        <div className='expenses'>
                            <table id='expense-table'>
                                <tr>
                                    <th>Trip Members</th>
                                    <th>Expense Title</th>
                                    <th>Expenses Total</th>
                                    <th>Member Contribution</th>
                                </tr>
                               {Array.from(this.state.trip.tripMembers).map(member => {
                                   return(
                                       <tr>
                                           <td>{member}</td>
                                           <td>New Expense</td>
                                           <td>$1,280.72</td>
                                           <td>$150</td>
                                       </tr>
                                   )
                               })}
                            </table>                            
                        </div>
                        <Link to="/profile/trip/expenses"><button>Edit Expenses</button></Link>
                    </div>
                </div>
                <div id='close-button'>
                    <button>Close This Trip</button>
                </div>
               </div>
            </div>
        )
    }
}