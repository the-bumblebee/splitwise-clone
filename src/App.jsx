import React, { Component } from "react";
import UserRow from "./components/UserRow";

class App extends Component {
  constructor(props) {
    super(props);

    const userList = [
      { id: "bond007", name: "James Bond" },
      { id: "agent47", name: "Agent 47" },
      { id: "deadeye", name: "Chamber" },
    ];

    this.users = {};
    userList.forEach((user) => {
      this.users[user.id] = {
        name: user.name,
        additionalAmount: 0,
        amount: 0,
        isChecked: true,
      };
    });

    this.state = { users: this.users, totalExpense: 0 };
  }

  renderUserRowsList(users) {
    return Object.keys(users).map((key) => (
      <UserRow
        key={key}
        userId={key}
        user={users[key]}
        handleCheckboxChange={this.handleCheckboxChange}
      />
    ));
  }

  splitExpenses(totalExpense) {
    let users = JSON.parse(JSON.stringify(this.state.users));
    let count = 0;

    for (const userId in users) {
      if (users[userId].isChecked) {
        count += 1;
      }
    }

    for (const userId in users) {
      if (users[userId].isChecked) {
        users[userId].amount = totalExpense / count;
      }
    }

    return users;
  }

  handleExpenseChange = (event) => {
    const totalExpense = event.target.value;

    // TODO: Logic for splitting expense among users
    const users = this.splitExpenses(totalExpense);

    this.setState({ totalExpense: event.target.value, users });
    console.log();
  };

  handleCheckboxChange = (isChecked, userId) => {
    this.setState({
      users: {
        ...this.state.users,
        [userId]: {
          ...this.state.users[userId],
          isChecked,
        },
      },
    });
  };

  render() {
    return (
      <div>
        <div className="w-25 p-2 m-1 border border-secondary">
          Expense to be splitted:{" "}
          <input
            type="number"
            value={this.state.totalExpense}
            onChange={this.handleExpenseChange}
          />
        </div>
        {this.renderUserRowsList(this.state.users)}
      </div>
    );
  }
}

export default App;
