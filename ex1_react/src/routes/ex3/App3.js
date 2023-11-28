import React from 'react';
import { Provider } from 'react-redux';
import store from "./components/store";
import Balance from "./components/Balance";
// import DepositButton from "./components/DepositButton";
// import WithdrawButton from "./components/WithdrawButton";
import Transaction from './components/Transaction';
import { Link } from "react-router-dom";
import styled from "styled-components";

const AppContainer = styled.div`
  background: #fff;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);

  @media screen and (min-width: 550px) {
    padding: 4rem;
  }

  > * {
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
  }

  > form {
    max-width: 100%;
  }

  > h1 {
    display: block;
    max-width: 100%;
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;
  }
`;

const App3 = () => {
  return (
    <Provider store={store}>
      <Link to="/">Home</Link>
      <AppContainer>
        <h1>ATM Machine</h1>
        <Transaction />
        {/* <DepositButton />
        <WithdrawButton /> */}
        <Balance />
      </AppContainer>
    </Provider>
  );
};

export default App3;
