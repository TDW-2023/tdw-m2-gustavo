// src/WithdrawButton.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withdraw } from '../reduxFeatures/balanceSlice';

const WithdrawButton = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');

  const handleWithdraw = () => {
    if (amount) {
      dispatch(withdraw(Number(amount)));
      setAmount('');
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Valor do saque"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleWithdraw}>Sacar</button>
    </div>
  );
};

export default WithdrawButton;