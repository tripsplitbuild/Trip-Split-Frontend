import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import '../../css/index.css';
import ExpenseTrip from './ExpenseTrip';
import {connect} from 'react-redux';
import axios from 'axios';
import CreateTrip from './CreateTrip'; 
import {showAdd} from '../Motions/motions';

class Trip extends Component{
    constructor(props){
        super(props);
        this.state = {
            trip:{
                trip_id:'',
                trip_name: '',
                trip_owner_id:'',
                expenses:[],
                trip_close_trip:'',
                trip_start_date: null,
                trip_end_date: null,
                trip_members:[
                    {
                        tripMember_id: null,
                        member_username: ''
                    }
                ],
                expenseInfo:[{
                    expense_id: null,
                    expense_name: '',
                    expense_total: null
                }]
            }
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:9090/trips/${this.props.location.state.trip}`, 
        {headers: { Authorization: localStorage.getItem("token") }})
        .then(res =>{ console.log(res.data)
            this.setState({
                ...this.state.trip,
                trip:{
                    trip_id: this.props.location.state.trip,
                    trip_name: res.data.trip_name,
                    trip_owner_id: res.data.trip_owner_id,
                    trip_close_trip: res.data.trip_close_trip,
                    trip_start_date: res.data.trip_start_date,
                    trip_end_date: res.data.trip_end_date,
                    trip_members: res.data.trip_members.map(member => member),
                    expenseInfo: res.data.expenseInfo.map(expense => expense)
                }               
            })
        })
        .catch(err => console.log(err))
        
        console.log(this.state)
        console.log(this.props.location.state.trip)
        console.log(this.props)
        this.showMemebers();
    }

    showMemebers = () =>{
        if(this.state.trip.trip_members != null){
            return this.state.trip.trip_members.map(member => {
                return(
                    <ul key={member.tripMember_id} mem={member.tripMember_id}>
                        <li>{member.member_username}</li>
                        <button onClick={() => this.removeMember(member.tripMember_id)}>Remove</button>
                    </ul>
                )
            })
        }
    }
    newMember = e =>{
        e.preventDefault();        
        let fields = document.querySelector('.newMembers');
        let newClass = document.createElement('div');
        newClass.className = `add-member`;
        newClass.style.display = 'flex'
        let newField = document.createElement('input');
        newField.type = 'text';
        newField.className =`tripmember`;
        newField.placeholder = 'Member Name';        
        let actionButtons = document.createElement('div');
        actionButtons.className = 'action-buttons';
        let add = document.createElement('button');
        add.textContent = 'Add Another'
        add.className = 'add';
        add.addEventListener("click", this.newMember) 
        let remove = document.createElement('button');
        remove.textContent = 'Remove';
        remove.className = 'remove';
        remove.addEventListener("click", this.removeMember)
        actionButtons.appendChild(add);
        actionButtons.appendChild(remove);
        newClass.appendChild(newField);
        newClass.appendChild(actionButtons)
        fields.appendChild(newClass);  
             
        return (fields)
        
    }

    cancelAdd = e =>{
        e.preventDefault();
        let element = e.target;
        let parent = element.parentNode;
        let grandparent = parent.parentNode;
        grandparent.remove();
        
    }

    removeMember = (id) =>{
        //e.preventDefault();
        console.log(id)
        axios.delete(`http://localhost:9090/tripMembers/${id}`, 
        {headers: { Authorization: localStorage.getItem("token") }})
        .then(res => this.setState({
            trip: this.state.trip
        }))
        .catch(err => console.log(err))
        return this.setState({trip: this.state.trip})

    }

    addMembers = () =>{
            
        let members = document.querySelectorAll('.tripmember');
        let members2 = Array.from(members);
        let sections = document.querySelector('.newMembers');
        members2.forEach(member => {
            let newMember = {
                trip_username: member.value,
                trip_id: this.props.location.state.trip 
            };
            axios.post('http://localhost:9090/tripMembers', newMember, 
            {headers: { Authorization: localStorage.getItem("token") }})
            .then(res => this.setState({
                trip:{
                    trip_members: [...this.state.trip.trip_members, newMember]
                }
            }))
            .catch(err => console.log(err))
        })
       
        sections.style.display = 'none';
        console.log(this.state.trip.trip_members)
        return this.forceUpdate()
    }

    render(){
        return(
            <div>
                {console.log(this.props.user_data)}
                <div className='trip'>
                <div className='header'>
                    <h1>{this.state.trip.trip_name}</h1>
                    <h3>By: {this.props.user_data.first_name}</h3>
                </div>
                <div className='trip-data'>
                    <div className='members'>
                        <h4>Trip Members</h4>
                        <div className='trip-members'>
                            <div className='member'>{this.showMemebers()}</div>
                        </div>
                        <button onClick={showAdd}>Edit Members</button>
                        <div className="newMembers">
                            <div className="add-member">
                                <input type="text" name="trip_member" className="tripmember" placeholder="Member Name"/>
                                <div className="action-buttons">
                                    <button className='add' onClick={this.newMember}>Add Another</button>
                                    <button className='remove' onClick={this.removeMember}>Cancel</button>
                                </div>
                            </div>
                            <button onClick={this.addMembers}>Complete Members</button> 
                        </div>                               
                    </div>
                    <div className='trip-expenses'>
                        <h4>Trip Expenses</h4>
                        <div className='expenses'>                                                    
                        </div>
                        <Link to={{pathname:"/profile/trip/expenses", state:{trip: this.state.trip.trip_id}}}><button>Edit Expenses</button></Link>
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

const mapStateToProps = state =>{
    console.log(state)
    return{
      user_data: state.user_data,  
      isLoggedIn: state.isLoggedIn,
      credentials: state.credentials,
      id: state.credentials.id
      
    };
  };
  
  export default connect(
    mapStateToProps,
    {}
  )(Trip);