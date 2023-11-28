// src/DepositButton.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deposit } from '../reduxFeatures/balanceSlice';

const DepositButton = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    if (amount) {
      dispatch(deposit(Number(amount)));
      setAmount('');
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Valor do depósito"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Depositar</button>
    </div>
  );
};

export default DepositButton;