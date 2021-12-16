import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [transactions, setTransactions] = React.useState()
  React.useEffect(() => {
    fetch('https://api.ethplorer.io/getAddressTransactions/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045?apiKey=freekey')
      .then(response => response.json())
      .then(data => setTransactions(data))
  }, [])
  console.log(transactions)
  return (
    <div className="App">
      <button>Hello</button>
    </div>
  );
}

export default App;
