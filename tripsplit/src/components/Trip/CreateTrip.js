import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { createTrip, tripComplete } from '../Actions/index';
import { create } from 'domain';
import {showAdd, showCreate} from '../Motions/motions';
import ProfileHome from '../Profile/ProfileHome';


class CreateTrip extends Component{
    constructor(props){
        super(props);
        this.state = {
            trip:{                
                trip_name:'',
                trip_members:[],
                close_trip: false
            }            
        }
       
    }
    componentDidMount(){
        this.props.createTrip(this.props.trip.credentials.id);
        console.log(this.props.trip.credentials.id)
        console.log(this.props)
    }

    handleTripChange = e =>{
        e.preventDefault();
        this.setState({
            trip: {
              ...this.state.trip,
            [e.target.name]: e.target.value
            }
          });
          
    }

    completeTrip = e =>{
        e.preventDefault();
        this.setState({
            trip: {
                ...this.state.trip,
                trip_name: this.state.trip.trip_name,
                close_trip: this.state.trip.close_trip,
                trip_members: this.state.trip.trip_members                
            }
        });
        this.addMembers(); 
        let newTrip = {
            trip_name: this.state.trip.trip_name,
            user_id: this.props.trip.credentials.id,
            close_trip: this.state.trip.close_trip
        };
        
        this.props.tripComplete(newTrip); 
        this.props.update(); 
         
    }
    
    newMember = e =>{
        e.preventDefault();        
        let fields = document.querySelector('.newMembers');
        let newClass = document.createElement('div');
        newClass.className = `add-member`;
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

    removeMember = e =>{
        e.preventDefault();
        let element = e.target;
        let parent = element.parentNode;
        let grandparent = parent.parentNode;
        grandparent.remove();
        
    }

    addMembers = () =>{
            
        let members = document.querySelectorAll('.tripmember');
        let members2 = Array.from(members);
        let sections = document.querySelector('.newMembers');
        this.setState({
            trip_members: [...this.state.trip.trip_members, 
                members2.forEach(member => this.state.trip.trip_members.push(member.value))]
            }                        
        );
        sections.remove()
    }

    removeCreate = (e) =>{
        const createForm = document.querySelector('.create-form');
        return createForm.style.display = 'none';
    }

    render(){
        return(
            <div>
                <div className="new-trip">
                    <span className="create-form">                        
                        <form onSubmit={this.completeTrip}>
                            <div className="create-actions">
                                <button type='submit' id='submit-trip'>Complete Trip</button>
                                <input type="text" name="trip_name" id="tripname" placeholder="Trip Name/Location" onChange={this.handleTripChange}/>
                                <button type='button' id='cancel-trip' onClick={this.removeCreate}>Cancel Trip</button>
                            </div>
                            <div className="newMembers">
                                <button id="addMembers" onClick={showAdd}>Add Trip Members</button>
                                <div className="add-member">
                                    <input type="text" name="trip_member" className="tripmember" placeholder="Member Name"/>
                                    <div className="action-buttons">
                                        <button className='add' onClick={this.newMember}>Add Another</button>
                                        <button className='remove' onClick={this.removeMember}>Remove</button>
                                    </div>
                                </div>                                
                            </div>                            
                        </form>
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        trip:{                
            close_trip: state.close_trip,
            id: state.id,
            isRegistering: state.isRegistering,
            isLoggedIn: state.isLoggedIn,
            credentials: state.credentials,
        }     
    };
  };

export default connect(
    mapStateToProps,{createTrip, tripComplete}
)(CreateTrip);