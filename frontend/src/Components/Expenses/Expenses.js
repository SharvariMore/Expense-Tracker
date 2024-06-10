import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

function Expenses() {

  const { addExpense, getExpenses, expenses, deleteExpense, totalExpense } = useGlobalContext();

  useEffect(() =>{
    getExpenses()
}, []);

    const formatAmount = (amount) => {
        const amountStr = amount.toString();
        return amountStr.length > 4 ? `${amountStr.slice(0, 4)}...` : amountStr;
    };

  return (
    <ExpensesStyled>
        <InnerLayout>
        <h1>Expenses</h1>
            <h2 className='total-expense'>Total Expense: <span>${formatAmount(totalExpense())}</span></h2>
            <div className='expense-content'>
                <div className='form-container'>
                    <ExpenseForm />
                </div>
                <div className='expenses'>
                    {expenses.map((expense) => {
                        const { _id, title, amount, date, category, description, type } = expense;
                        return <IncomeItem 
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    amount={amount}
                                    date={date}
                                    category={category}
                                    description={description}
                                    type={type}
                                    indicatorColor="var(--color-green)"
                                    deleteItem={deleteExpense}
                        />
                    })}
                </div>
            </div>
        </InnerLayout>
    </ExpensesStyled>
  )
}

const ExpensesStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expense{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .expense-content{
        display: flex;
        gap: 2rem;
        .expenses{
            flex: 1;
            padding-right: 20px;
        }
    }
`;

export default Expenses