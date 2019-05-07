import React, {Component} from 'react';

import TweenMax from 'gsap/TweenMax'; 
import '../../css/index.css';
import {connect} from 'react-redux';
import axios from 'axios';

class ExpenseTrip extends Component{
    constructor(props){
        super(props);
        this.state = {
            expense: {
                expenses: [],
                members:[],
                expense_name: '',
                expense_username: '',
                expense_amount_paid: null,
                expense_total: null,
                expense_id: null
            }
        }
    }

    componentDidMount(){
       axios.get('http://localhost:9090/expense',
       {headers: { Authorization: localStorage.getItem("token") }})
       .then(res => {
           this.setState({
               expense:{
                   ...this.state.expense,
                   expenses: res.data
               }
           })
       }
        )
       .catch(err => console.log(err))
       console.log(this.props.location.state.trip)

       axios.get('http://localhost:9090/expenseMember',
        {headers: { Authorization: localStorage.getItem("token") }})
        .then(res => this.setState({
            expense:{
                ...this.state.expense,
                members: res.data
            }
        }))
        .catch(err => console.log(err))
    }

    getTotalExpenses = () =>{
        let expenses = Array.from(this.state.expense.expenses.map(expense => expense.expense_total));
        console.log(expenses)
        let total = 0;
        total += expenses.reduce((acc, curr) => acc + curr, 0); 
        return total.toFixed(2);
    }

    handleExpChanges = (e) =>{
       e.preventDefault();       
       const allData = document.querySelectorAll('.expense-details');
       const users = document.querySelectorAll('.expUser');
       const amounts = document.querySelectorAll('.expAmount');
       const expId = this.state.expense.expense_id;
       
       allData.forEach(item => {        
        let user = item.childNodes[0].value;
        let amount = item.childNodes[1].value;
        let newItems = {
            expense_username: user,
            expense_amount_paid: amount,
            expense_id: expId            
        };
        console.log(item, expId)
        axios.put(`http://localhost:9090/expenseMember/${expId}`, newItems, {headers: { Authorization: localStorage.getItem("token") }})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))         
       })
    }

    handleClick = e =>{
        let members = document.querySelector('.member-contributions');
        members.style.display ='grid';
        this.showMembers(members);
    }

    showMembers = (m) =>{
        return this.state.members.map(member =>{
            let memDiv = document.createElement('div');
            let contDiv = document.createElement('div');
            memDiv.className = "member";
            contDiv.className = "contribution"
            let memName = document.createTextNode(member.memberName);
            let contribution = document.createTextNode(member.memberContribution);
            memDiv.appendChild(memName);
            contDiv.appendChild(contribution);
            m.appendChild(memDiv);
            m.appendChild(contDiv);

        })       
    }

    handleChange = (e) =>{
        e.preventDefault();
        this.setState({
            expense:{
                ...this.state.expense,
            [e.target.name]: e.target.value
            }
        })
    }

    handleEdit = (id) =>{
        //e.preventDefault();
        let exId = id ;
        return this.setState({
            expense:{
                ...this.state.expense,
                expense_id: exId
            }
        })
        this.forceUpdate(); 
    }
    
    
    

    addExpenses = (e) =>{
        e.preventDefault();
        let expense = {
            trip_id: this.props.location.state.trip,
            expense_name: this.state.expense.expense_name,
            expense_total: this.state.expense.expense_total
        }
        console.log(expense)
        axios.post('http://localhost:9090/expense', expense, 
        {headers: { Authorization: localStorage.getItem("token") }})
        .then(res => this.setState({
            expense:{
                expense_name: '',
                expense_username: '',
                expense_amount_paid: null,
                expense_total: null,
                expenses:[
                    ...this.state.expense.expenses,
                    res.data]
            }            
        }))
        .catch(err => console.log(err))
    }

    newMember = (e) =>{
        e.preventDefault();
        let form = document.querySelector('.add-member form');
        form.style.display = 'flex';
        let member = {
            expense_username: form.childNodes[0],
            expense_amount_paid: form.childNodes[1],
            expense_id: this.state.expense.expense_id      
        }
        return console.log(member)
    }
   

    render(){
        return(
            <div>
                <div className='header'>
                    <h1>Expense Details</h1>
                </div>
                <div id="expense-data">
                <div className="add-expense">
                    <button>Add Expense</button>
                    <form  onSubmit={this.addExpenses}>
                        <input type='text' name='expense_name' placeholder='Expense Title' onChange={this.handleChange}/>
                        <input type='number' name='expense_total' placeholder='Expense Total' onChange={this.handleChange}/>
                        <input type='text' name='expense_username' placeholder='Member Username' onChange={this.handleChange}/>
                        <input type='number' name='expense_amount_paid' placeholder='Member Contribution' onChange={this.handleChange}/>
                        <button type='submit' name='complete'>Complete</button>
                    </form>
                </div>
                <div className='expense-list'> 
                    <div className='expense-titles'>                   
                    <h4>Trip Expenses</h4>
                        <div className="expense">
                            {this.state.expense.expenses.map(expense =>{
                                return(
                                    <ul key={expense.id} expId={expense.id} name='item' onClick={() => {return this.handleEdit(expense.id)}}>
                                        <li>{expense.expense_name}</li>
                                    </ul>
                                )
                            })}
                        </div>
                        </div>
                        <div className='expense-totals'>
                            <h4>Expense Total</h4> 
                            <div className="totals">
                            {this.state.expense.expenses.map(total => {
                                return(
                                    <ul key={total.id}>
                                        <li>${total.expense_total}</li>
                                    </ul>
                                )
                            })}
                            </div>
                        </div>
                </div>
                <div className='member-contributions' style={{display:'flex'}}>
                    <h3>Member Contributions</h3>
                    <div className='contribution-list'>
                        <form>
                            <div className='expense-entries'>
                            {this.state.expense.members.map(member => {
                                console.log(member.id)
                                return(
                                    <div className='expense-details' key={member.id} identifier={member.id}>
                                        <input type='text' name='expense_username' className='expUser' defaultValue={member.expense_username} />
                                        <input type='number' name='expense_amount_paid' className='expAmount' defaultValue={member.expense_amount_paid} />
                                    </div>
                                    )                               
                            })}
                            </div>                        
                        </form>
                        
                        <div className='add-member'>
                            <button type='button' id='add-members' onClick={this.newMember}>Add Member</button>
                            <form>                                
                                <input type='text' name='expense_username' className='expUser' placeholder='Member Username' />
                                <input type='number' name='expense_amount_paid' className='expAmount' placeholder='Amount Paid' />
                            </form>
                        </div>
                    </div>
                    <button type='button' id='submit-changes' onClick={this.handleExpChanges}>Save Changes</button>
                </div>
                <h2>Total for this trip: ${this.getTotalExpenses()}</h2>
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
  )(ExpenseTrip);