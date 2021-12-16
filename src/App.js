import React from "react";
import uauth from "./uauth";
import "./App.css";

function App() {
  const [transactions, setTransactions] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    if (user) {
      fetch(
        "https://api.ethplorer.io/getAddressTransactions/" +
          user.wallet_address +
          "?apiKey=EK-5axqG-LAkzJ7L-qsQEy"
      )
        .then((response) => response.json())
        .then((data) => setTransactions(data));
    }
  }, [user]);

  const handleLogin = () => {
    uauth
      .loginWithPopup()
      .then((user) => setUser(user))
      .catch((error) => console.log(error));
      //.finally(() => window.location.reload());
  };

  const handleLogout = () => {
    uauth
      .logout()
      .then(() => setUser(undefined))
      .catch((error) => console.log(error));
      //.finally(() => window.location.reload());
  };

  const renderContent = () => {
    if (user) {
      return (
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
      );
    } else {
      return (
        <div className="landing">
          <h1>Welcome to UD Transactions</h1>
          <h3>Login with the button above</h3>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <div className="topnav">
        {user ? (
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="button" onClick={handleLogin}>
            Login With Unstoppable
          </button>
        )}
      </div>
      {renderContent()}
    </div>
  );
}

export default App;
