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
          <div className="App">
      <table>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Value</th>
          <th>Date</th>
        </tr>
        {transactions &&
          transactions.map(({ from, to, value, timestamp }) => (
            <tr>
              <td>{from}</td>
              <td>{to}</td>
              <td style={{ textAlign: "right" }}>
                {value.toFixed(4).toString() + " ETH"}
              </td>
              <td>{new Date(timestamp * 1000).toLocaleDateString()}</td>
            </tr>
          ))}
      </table>
    </div>
    </div>
  );
}

export default App;
