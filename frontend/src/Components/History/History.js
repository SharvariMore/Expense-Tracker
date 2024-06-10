import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'

const History = () => {

  const { transactionHistory } = useGlobalContext();

  const [...history] = transactionHistory();

  const formatText = (text) => {
    const textStr = text.toString();
    return textStr.length > 10 ? `${textStr.slice(0, 10)}..` : textStr;
  };

  const formatAmount = (amount) => {
    const amountStr = amount.toString();
    return amountStr.length > 3 ? `${amountStr.slice(0, 3)}..` : amountStr;
  };

  return (
    <HistoryStyled>
        <h2>Recent History</h2>
        {history.map((item) => {
            const { _id, title, amount, type } = item;
            return (
                <div key={_id} className='history-item'>
                    <p style={{
                        color: type === 'expense' ? 'purple' : 'var(--color-green)'
                    }}>
                        {formatText(title)}
                    </p>
                    <p style={{
                        color: type === 'expense' ? 'purple' : 'var(--color-green)'
                    }}>
                        {type === 'expense' ? `-${amount <= 0 ? 0 : formatAmount(amount)}` : `+${amount <= 0 ? 0 : formatAmount(amount)}`}
                    </p>
                </div>
            )
        })}
    </HistoryStyled>
  )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History
