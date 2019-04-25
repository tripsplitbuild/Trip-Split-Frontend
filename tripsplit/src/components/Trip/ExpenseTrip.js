import React, {Component} from 'react';

import TweenMax from 'gsap/TweenMax'; 
import '../../css/index.css';

export default class ExpenseTrip extends Component{
    constructor(props){
        super(props);
        this.state = {
            expenses: [],
            members:[],

        }
    }

    componentDidMount(){
        this.setState({
            expenses: [
                {expense: 'food',
                expenseTotal:800},
                {expense: 'hotel',
                expenseTotal:1500},
                {expense: 'transportation',
                expenseTotal:1200}],
            members: [
                {memberName: 'member1',
                 memberContribution:267},
                {memberName:'member2',
                 memberContribution:266},
                {memberName:'member3',
                 memberContribution:267}
            ]
            
        }
        );
    }

    getTotalExpenses = () =>{
        let expenses = Array.from(this.state.expenses.map(expense => expense.expenseTotal));
        return expenses.reduce((acc, curr) => acc + curr, 0 );
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

   

    render(){
        return(
            <div>
                <div className='header'>
                    <h1>Expense Details</h1>
                </div>
                <div id="expense-data">
                <div className='expense-list'>                    
                    <div id="expense-name">Trip Expenses
                        {this.state.expenses.map(expense => {
                            return(
                                <div className='expense' onClick={this.handleClick}>{expense.expense}</div>
                            )
                        })}
                        </div>
                    <div id="expense-total">Expense Total
                        {this.state.expenses.map(expense =>{
                            return(
                                <div className='total'>{expense.expenseTotal}</div>
                            )
                        })}
                        </div>  
                </div>
                <div className='member-contributions' style={{display:'none'}}>
                        <h3>Member Contributions</h3>
                </div>

                <h2>Total for this trip: {this.getTotalExpenses()}</h2>
                </div>
            </div>


        )
    }
}